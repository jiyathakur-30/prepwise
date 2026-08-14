// server/aiPlugin.js
// Vite dev-server middleware for secure server-side AI integration in PrepWise

import fs from 'fs';
import path from 'path';

function getApiKey(env = {}) {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  if (env && env.GEMINI_API_KEY) return env.GEMINI_API_KEY;

  // Dynamic fallback to root .env / .env.local without requiring server restart
  try {
    const envFiles = ['.env', '.env.local'];
    for (const file of envFiles) {
      const envPath = path.resolve(process.cwd(), file);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        const match = content.match(/^GEMINI_API_KEY=(.*)$/m);
        if (match && match[1]) {
          const val = match[1].trim().replace(/^["']|["']$/g, '');
          if (val) return val;
        }
      }
    }
  } catch (e) {
    // Ignore file read error
  }
  return null;
}

function getModel(env = {}) {
  if (process.env.GEMINI_MODEL) return process.env.GEMINI_MODEL;
  if (env && env.GEMINI_MODEL) return env.GEMINI_MODEL;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/^GEMINI_MODEL=(.*)$/m);
      if (match && match[1]) {
        const val = match[1].trim().replace(/^["']|["']$/g, '');
        if (val) return val;
      }
    }
  } catch (e) {
    // Ignore error
  }
  return 'gemini-3.7-flash';
}

export function aiApiPlugin(env = {}) {
  return {
    name: 'prepwise-ai-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Intercept POST /api/ai/generate-question
        if (req.method === 'POST' && (req.url === '/api/ai/generate-question' || req.url?.startsWith('/api/ai/generate-question?'))) {
          try {
            // Read incoming request stream
            const body = await readRequestBody(req);
            const {
              targetJob,
              roleId = 'frontend-dev',
              difficulty = 'medium',
              interviewType = 'technical',
              personalityId = 'friendly-sophia',
              questionIndex = 0,
              previousQuestions = [],
              previousEvaluations = []
            } = body;

            // Secure server-side API Key retrieval
            const apiKey = getApiKey(env);
            const model = getModel(env);

            if (!apiKey) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({
                success: false,
                error: 'GEMINI_API_KEY is not configured on the server. Falling back to local mock bank.',
                fallback: true
              }));
            }

            const prompt = `You are the AI Interview Engine for PrepWise, an interview coaching platform.
Generate a realistic, high-quality interview question tailored to the candidate's target career and interview parameters.

Parameters:
- Target Job / Career: "${targetJob || roleId}"
- Predefined Track ID: "${roleId}"
- Difficulty Level: "${difficulty}" (must be "easy", "medium", or "hard")
- Interview Type: "${interviewType}" (must be "technical" or "hr")
- Coach Persona ID: "${personalityId}"
- Question Index: ${questionIndex + 1} of 5
- Previous Questions Asked (DO NOT repeat any of these concepts or questions): ${previousQuestions.length > 0 ? previousQuestions.join('; ') : 'None'}

Requirements:
1. If the target job is a custom career (e.g. "AI Engineer", "Cloud Architect", "Data Scientist", "DevOps Engineer"), generate a question specifically for that career, regardless of the track ID.
2. The question must match the requested difficulty level (${difficulty}).
3. Return ONLY valid JSON matching this schema:
{
  "id": "ai_q_${Date.now()}",
  "question": "The interview question text",
  "topic": "Core technical or behavioral topic name",
  "difficulty": "${difficulty}",
  "type": "${interviewType === 'hr' ? 'hr' : 'technical'}",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "focusReason": "Brief sentence explaining what competency this question evaluates",
  "idealAnswer": "A comprehensive benchmark answer that demonstrates mastery, trade-offs, and clear structure"
}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const activeModels = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
            let geminiResponse = null;
            let lastErrorText = '';

            for (const candidate of activeModels) {
              try {
                const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${candidate}:generateContent?key=${apiKey}`;
                const res = await fetch(targetUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  signal: controller.signal,
                  body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                      responseMimeType: 'application/json',
                      temperature: 0.7
                    }
                  })
                });

                if (res.ok) {
                  geminiResponse = res;
                  break;
                } else {
                  lastErrorText = await res.text();
                  continue;
                }
              } catch (e) {
                lastErrorText = e.message;
              }
            }

            clearTimeout(timeoutId);

            if (!geminiResponse || !geminiResponse.ok) {
              const rawErrorText = geminiResponse ? await geminiResponse.text() : 'No response';
              let parsedErr = 'Gemini API call failed';
              try {
                const j = JSON.parse(rawErrorText);
                parsedErr = j.error?.message || j.error?.status || `Status ${geminiResponse?.status || 500}`;
              } catch (e) {
                parsedErr = `Status ${geminiResponse?.status || 500}: ${rawErrorText.slice(0, 100)}`;
              }
              const sanitizedError = String(parsedErr).replace(/key=[^&\s]+/gi, 'key=REDACTED');
              console.warn(`[aiPlugin] Gemini API error:`, sanitizedError);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({
                success: false,
                error: `Gemini API: ${sanitizedError}`,
                fallback: true
              }));
            }

            const geminiData = await geminiResponse.json();
            const rawContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!rawContent) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({
                success: false,
                error: 'Empty response from AI provider',
                fallback: true
              }));
            }

            const parsedQuestion = JSON.parse(rawContent);

            // Validate and sanitize the question object
            const validatedQuestion = {
              id: parsedQuestion.id || `ai_q_${Date.now()}`,
              question: parsedQuestion.question?.trim() || '',
              topic: parsedQuestion.topic?.trim() || targetJob || 'Technical Assessment',
              difficulty: ['easy', 'medium', 'hard'].includes(parsedQuestion.difficulty) ? parsedQuestion.difficulty : difficulty,
              type: ['technical', 'hr'].includes(parsedQuestion.type) ? parsedQuestion.type : (interviewType === 'hr' ? 'hr' : 'technical'),
              keywords: Array.isArray(parsedQuestion.keywords) && parsedQuestion.keywords.length > 0 
                ? parsedQuestion.keywords.map(k => String(k).trim()).filter(Boolean)
                : ['architecture', 'tradeoffs', 'implementation'],
              focusReason: parsedQuestion.focusReason?.trim() || `Evaluating competency for ${targetJob || roleId}`,
              idealAnswer: parsedQuestion.idealAnswer?.trim() || 'A structured response discussing key technical tradeoffs and implementation patterns.'
            };

            if (!validatedQuestion.question) {
              throw new Error('AI generated an empty question string.');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
              success: true,
              question: validatedQuestion
            }));

          } catch (err) {
            console.warn('[aiPlugin] Error during question generation:', err.message);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
              success: false,
              error: err.message,
              fallback: true
            }));
          }
        }

        // Pass through non-matching requests
        next();
      });
    }
  };
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) { // 1MB guard
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}
