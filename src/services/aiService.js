// src/services/aiService.js
// Client service for interacting with PrepWise secure server-side AI endpoints

/**
 * Requests an AI-generated interview question from the backend.
 * 
 * @param {Object} params
 * @param {string} params.targetJob - Target job title or custom career
 * @param {string} params.roleId - Predefined role specialization ID
 * @param {string} params.difficulty - 'easy' | 'medium' | 'hard'
 * @param {string} params.interviewType - 'technical' | 'hr'
 * @param {string} params.personalityId - AI Coach ID
 * @param {number} params.questionIndex - 0-indexed question sequence number
 * @param {Array<string>} params.previousQuestions - Array of question strings already asked
 * @param {Array<Object>} params.previousEvaluations - History of evaluations if any
 * @returns {Promise<{success: boolean, question?: Object, error?: string, fallback?: boolean}>}
 */
export async function requestGenerateQuestion(params) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch('/api/ai/generate-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(params)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        error: `Server responded with status ${response.status}`,
        fallback: true
      };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      success: false,
      error: err.name === 'AbortError' ? 'AI generation request timed out' : err.message,
      fallback: true
    };
  }
}
