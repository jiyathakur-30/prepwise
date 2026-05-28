// PrepWise - Advanced Heuristics AI Interview Evaluation Engine
// Simulates highly contextual, intelligent NLP analytics for answers

import { personalities } from '../data/personalities';
import { idealAnswers } from '../data/idealAnswers';

const FILLER_WORDS = [
  /\bum\b/gi, /\buh\b/gi, /\blike\b/gi, /\bbasically\b/gi, 
  /\bactually\b/gi, /\bliterally\b/gi, /\bsort of\b/gi, /\bkind of\b/gi,
  /\bmaybe\b/gi, /\bi guess\b/gi, /\byou know\b/gi, /\bmean\b/gi
];

const TRANSITION_PHRASES = [
  /\bfirstly\b/gi, /\bsecondly\b/gi, /\bfor example\b/gi, /\bspecifically\b/gi,
  /\bin addition\b/gi, /\bhowever\b/gi, /\bconsequently\b/gi, /\btherefore\b/gi,
  /\bas a result\b/gi, /\bon the other hand\b/gi, /\bunder the hood\b/gi, /\bkey benefit\b/gi
];

// STAR storytelling indicators
const STAR_SITUATION = [/\bsituation\b/i, /\btask\b/i, /\bproject\b/i, /\bdeadline\b/i, /\bcontext\b/i, /\bbackground\i/, /\bcompany\b/i];
const STAR_ACTION = [/\baction\b/i, /\bdid\b/i, /\bimplemented\b/i, /\bsolved\b/i, /\bled\b/i, /\bbuilt\b/i, /\bcreated\b/i, /\bcompromised\b/i, /\bdesigned\b/i];
const STAR_RESULT = [/\bresult\b/i, /\boutcome\b/i, /\bimpact\b/i, /\bachieved\b/i, /\bconsequently\b/i, /\bas a result\b/i, /\blearned\b/i, /\bresolved\b/i];

const HESITATION_WORDS = [
  /\bprobably\b/gi, /\bmaybe\b/gi, /\bnot sure\b/gi, /\bdon't know\b/gi, 
  /\bi guess\b/gi, /\bpossibly\b/gi, /\bperhaps\b/gi, /\bhope\b/gi
];

/**
 * Evaluates an individual question's answer.
 * @param {Object} question - The question object from data
 * @param {string} answer - The text answered by the user
 * @param {number} durationSeconds - Time spent on this question
 * @param {string} personalityId - Selected AI Coach Personality
 * @returns {Object} Analytical scores and written feedback details
 */
export function evaluateAnswer(question, answer, durationSeconds, personalityId = 'friendly-sophia') {
  const cleanAnswer = (answer || '').trim();
  const wordCount = cleanAnswer === '' ? 0 : cleanAnswer.split(/\s+/).length;
  
  // Fetch active coach
  const coach = personalities.find(c => c.id === personalityId) || personalities[0];

  // 1. Initial Empty State Handling
  if (wordCount === 0) {
    return {
      score: 0,
      scores: { technical: 0, communication: 0, confidence: 0 },
      feedback: {
        strengths: ['None'],
        weaknesses: ['Did not provide an answer.'],
        suggestions: ['Make sure to attempt the question to receive AI feedback.']
      },
      matchedKeywords: [],
      fillerCount: 0,
      adaptiveAction: 'DOWNGRADE',
      behavioralDiagnostics: {
        storytellingScore: 0,
        concisenessRating: 'Too Brief',
        hesitationCount: 0,
        redundancyLevel: 'Low',
        technicalSpecificity: 'Low',
        coachCommentary: "Please provide an answer so I can analyze your skills.",
        idealAnswer: idealAnswers[question.id] || "No ideal answer loaded."
      }
    };
  }

  // 2. Keyword & Concept Analysis
  const targetKeywords = question.keywords || [];
  const matchedKeywords = [];
  targetKeywords.forEach(keyword => {
    const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    if (regex.test(cleanAnswer)) {
      matchedKeywords.push(keyword);
    }
  });

  const keywordCoverage = targetKeywords.length > 0 
    ? (matchedKeywords.length / targetKeywords.length) * 100 
    : 100;

  // 3. Technical Knowledge / Completeness Score
  let technicalScore = 0;
  const targetWordCount = question.type === 'hr' ? 120 : 60;
  const wordScore = Math.min((wordCount / targetWordCount) * 45, 45); // Max 45 pts
  const keywordScore = (keywordCoverage / 100) * 55; // Max 55 pts
  technicalScore = Math.round(wordScore + keywordScore);
  
  if (technicalScore < 20 && wordCount > 20) {
    technicalScore = Math.round(wordCount > 50 ? 45 : 30);
  }

  // Strict coach penalty / Friendly coach safety net
  if (coach.id === 'strict-marcus') {
    technicalScore = Math.max(technicalScore - 6, 15);
  } else if (coach.id === 'friendly-sophia') {
    technicalScore = Math.min(technicalScore + 4, 100);
  }

  // 4. Communication Score
  let communicationScore = 60;
  
  // Scan for transitions
  let transitionsFound = 0;
  TRANSITION_PHRASES.forEach(regex => {
    if (regex.test(cleanAnswer)) {
      transitionsFound++;
    }
  });
  communicationScore += Math.min(transitionsFound * 8, 20);

  // Behavioral specific analysis (STAR method check)
  let storytellingScore = 0;
  if (question.type === 'hr') {
    let situationHit = STAR_SITUATION.some(r => r.test(cleanAnswer)) ? 1 : 0;
    let actionHit = STAR_ACTION.some(r => r.test(cleanAnswer)) ? 1 : 0;
    let resultHit = STAR_RESULT.some(r => r.test(cleanAnswer)) ? 1 : 0;
    
    storytellingScore = Math.round((situationHit * 25) + (actionHit * 50) + (resultHit * 25));
    
    // Recruiter Sarah is strict about STAR
    if (coach.id === 'hr-sarah') {
      communicationScore += Math.min(storytellingScore * 0.25, 20);
      if (storytellingScore < 50) {
        communicationScore = Math.max(communicationScore - 12, 35);
      }
    } else {
      communicationScore += Math.min(storytellingScore * 0.2, 20);
    }
  } else {
    // Technical clarity boost for appropriate concise explanations
    if (wordCount >= 40 && wordCount <= 110) {
      communicationScore += 12;
    }
    // Vikram demands explicit tradeoffs
    if (coach.id === 'faang-vikram') {
      if (/\b(tradeoff|trade-off|alternative|versus|compromise|performance|complexity)\b/i.test(cleanAnswer)) {
        communicationScore = Math.min(communicationScore + 8, 100);
      } else {
        communicationScore = Math.max(communicationScore - 8, 40);
      }
    }
  }

  communicationScore = Math.min(Math.round(communicationScore), 100);

  // 5. Confidence Score
  let confidenceScore = 95;
  let fillerCount = 0;

  FILLER_WORDS.forEach(regex => {
    const matches = cleanAnswer.match(regex);
    if (matches) {
      fillerCount += matches.length;
    }
  });

  const fillerDensity = wordCount > 0 ? fillerCount / wordCount : 0;
  const confidenceDeduction = Math.min(fillerDensity * 130, 40);
  confidenceScore -= confidenceDeduction;

  // Scan for Hesitations
  let hesitationCount = 0;
  HESITATION_WORDS.forEach(regex => {
    const matches = cleanAnswer.match(regex);
    if (matches) {
      hesitationCount += matches.length;
    }
  });
  confidenceScore -= Math.min(hesitationCount * 5, 25);

  // Pressure adjustment based on Coach
  if (coach.id === 'strict-marcus') {
    confidenceScore = Math.max(confidenceScore - 10, 20);
  } else if (coach.id === 'friendly-sophia') {
    confidenceScore = Math.min(confidenceScore + 6, 100);
  } else if (coach.id === 'founder-elon') {
    // Elon deducts if response took too long
    if (durationSeconds > 120) {
      confidenceScore = Math.max(confidenceScore - 8, 30);
    }
  }

  confidenceScore = Math.max(Math.round(confidenceScore), 20);

  // 6. Overall Aggregated Score
  const overallScore = Math.round((technicalScore * 0.5) + (communicationScore * 0.3) + (confidenceScore * 0.2));

  // 7. Dynamic Adaptive Flow Actions
  let adaptiveAction = 'KEEP';
  if (overallScore < 45) {
    adaptiveAction = 'DOWNGRADE';
  } else if (overallScore > 78 && matchedKeywords.length >= Math.ceil(targetKeywords.length * 0.6)) {
    adaptiveAction = 'UPGRADE';
  }

  // 8. Conciseness & Verbosity Check
  let concisenessRating = 'Optimal';
  if (question.type === 'hr') {
    if (wordCount < 45) concisenessRating = 'Too Brief';
    else if (wordCount > 240) concisenessRating = 'Verbose';
  } else {
    if (wordCount < 25) concisenessRating = 'Too Brief';
    else if (wordCount > 150) concisenessRating = 'Verbose';
  }

  // 9. Vocabulary Repetition (Redundancies)
  const words = cleanAnswer.toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(/\s+/);
  const repeatedCounts = {};
  let duplicateWordsCount = 0;
  words.forEach(w => {
    if (w.length > 4 && !['about', 'would', 'could', 'should', 'their', 'there', 'which', 'these', 'under', 'using'].includes(w)) {
      repeatedCounts[w] = (repeatedCounts[w] || 0) + 1;
      if (repeatedCounts[w] > 3) duplicateWordsCount++;
    }
  });
  const redundancyLevel = duplicateWordsCount > 2 ? 'High' : duplicateWordsCount > 0 ? 'Moderate' : 'Low';

  // 10. Technical Specificity
  const specificityPercent = wordCount > 0 ? (matchedKeywords.length / wordCount) * 100 : 0;
  const technicalSpecificity = specificityPercent > 8 ? 'High' : specificityPercent > 3 ? 'Moderate' : 'Low';

  // 11. Generate Contextual Strengths, Weak Areas, and AI Suggestions
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // Coach-specific custom commentary prompt based on score
  let coachCommentary = '';
  if (overallScore >= 80) {
    coachCommentary = coach.commentaryTiers.strong;
  } else if (overallScore >= 50) {
    coachCommentary = coach.commentaryTiers.average;
  } else {
    coachCommentary = coach.commentaryTiers.weak;
  }

  // Deduce strengths
  if (matchedKeywords.length > 0) {
    strengths.push(`Good grasp of key terminologies: ${matchedKeywords.slice(0, 3).map(k => `"${k}"`).join(', ')}.`);
  }
  if (concisenessRating === 'Optimal') {
    strengths.push('Excellent balance of explanation size, avoiding rambling.');
  }
  if (transitionsFound >= 2) {
    strengths.push('Logical articulation utilizing structural transitions.');
  }
  if (question.type === 'hr' && storytellingScore >= 75) {
    strengths.push('Clear STAR-framework storytelling layout.');
  }

  if (strengths.length === 0) {
    strengths.push('Baseline response logged successfully.');
  }

  // Deduce weaknesses & suggestions
  if (keywordCoverage < 35) {
    weaknesses.push('Omitted core technical mechanisms or variables.');
    const missing = targetKeywords.filter(k => !matchedKeywords.includes(k));
    if (missing.length > 0) {
      suggestions.push(`Include detailed concepts like: ${missing.slice(0, 2).map(k => `"${k}"`).join(', ')}.`);
    }
  }
  if (concisenessRating === 'Too Brief') {
    weaknesses.push('Answer is overly concise, providing too little detail.');
    suggestions.push('Elaborate with dynamic examples or concrete scenarios under the hood.');
  } else if (concisenessRating === 'Verbose') {
    weaknesses.push('Response is slightly long-winded, threatening clarity.');
    suggestions.push('Keep sentences punchy and avoid conversational side-notes.');
  }
  if (fillerCount > 3) {
    weaknesses.push(`Heavy reliance on conversational fillers (used ${fillerCount} times).`);
    suggestions.push('Try pausing to formulate thoughts instead of utilizing vocal fillers.');
  }
  if (hesitationCount > 2) {
    weaknesses.push(`Reflected hesitant delivery (detected ${hesitationCount} doubt markers).`);
    suggestions.push('Deliver statements assertively; replace words like "probably" or "maybe" with direct action verbs.');
  }
  if (question.type === 'hr' && storytellingScore < 50) {
    weaknesses.push('Story lacked distinct actions or clear result outcomes.');
    suggestions.push('Structure behaviorals around the STAR formula: 20% context, 50% action, 30% metric impact.');
  }

  if (weaknesses.length === 0) {
    weaknesses.push('No critical delivery or technical gaps flagged.');
  }
  if (suggestions.length === 0) {
    suggestions.push('Maintain this superb pacing and terminology layout in future loops.');
  }

  return {
    score: overallScore,
    scores: {
      technical: technicalScore,
      communication: communicationScore,
      confidence: confidenceScore
    },
    feedback: {
      strengths,
      weaknesses: weaknesses.slice(0, 2),
      suggestions: suggestions.slice(0, 2)
    },
    matchedKeywords,
    fillerCount,
    adaptiveAction,
    behavioralDiagnostics: {
      storytellingScore,
      concisenessRating,
      hesitationCount,
      redundancyLevel,
      technicalSpecificity,
      coachCommentary,
      idealAnswer: idealAnswers[question.id] || "No ideal answer loaded."
    }
  };
}

/**
 * Calculates aggregated session statistics for the final dashboard.
 * @param {Array<Object>} evaluatedQuestions - List of evaluated question results
 * @returns {Object} Dashboard-ready statistics
 */
export function calculateSessionStats(evaluatedQuestions) {
  if (!evaluatedQuestions || evaluatedQuestions.length === 0) {
    return {
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      confidenceScore: 0,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      recommendedTopics: [],
      coachingInsight: "Complete your first interview loop to activate coaching diagnostic insights."
    };
  }

  const count = evaluatedQuestions.length;
  let totalOverall = 0;
  let totalTech = 0;
  let totalComm = 0;
  let totalConf = 0;
  
  const allStrengths = [];
  const allWeaknesses = [];
  const allSuggestions = [];
  const topicCounts = {};

  let hrCount = 0;
  let totalStorytelling = 0;

  evaluatedQuestions.forEach(item => {
    totalOverall += item.evaluation.score;
    totalTech += item.evaluation.scores.technical;
    totalComm += item.evaluation.scores.communication;
    totalConf += item.evaluation.scores.confidence;

    allStrengths.push(...item.evaluation.feedback.strengths);
    allWeaknesses.push(...item.evaluation.feedback.weaknesses);
    allSuggestions.push(...item.evaluation.feedback.suggestions);

    if (item.question.type === 'hr') {
      hrCount++;
      totalStorytelling += item.evaluation.behavioralDiagnostics?.storytellingScore || 0;
    }

    if (item.question.suggestedTopics) {
      item.question.suggestedTopics.forEach(topic => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    }
  });

  const avgOverall = Math.round(totalOverall / count);
  const avgTech = Math.round(totalTech / count);
  const avgComm = Math.round(totalComm / count);
  const avgConf = Math.round(totalConf / count);

  // Generate premium psychologically aware Coaching Insight
  let coachingInsight = '';
  if (avgTech < 68 && avgConf > 78) {
    coachingInsight = "You communicate confidently and maintain strong composure under pressure, but frequently gloss over critical technical details. To secure technical approvals, focus on articulating underlying execution mechanics and trade-offs rather than surface abstractions.";
  } else if (avgTech >= 80 && avgComm < 70) {
    coachingInsight = "You demonstrate exceptional technical knowledge and depth, but struggle to articulate concepts concisely, risking rambling. Focus on structural frameworks—such as outlining high-level points first—to deliver punchier, bite-sized answers that keep interviewers engaged.";
  } else if (avgConf < 70) {
    coachingInsight = "Your conceptual logic is sound, but hesitation markers and vocal crutches ('like', 'um', 'guess') dilute your authority. Try pausing and taking a brief, silent breath before starting your responses instead of filling space with vocal stabilizers.";
  } else if (hrCount > 0 && (totalStorytelling / hrCount) < 55) {
    coachingInsight = "You convey strong engineering ownership but frequently omit the STAR layout in behavioral questions. Ensure you allocate at least 30% of your responses to explicit, metric-driven results to validate your past contributions.";
  } else {
    coachingInsight = "You demonstrate high conceptual competence, structured pacing, and great behavioral resilience. You balance concrete implementation details with clear, assertive delivery. Continue polishing under strict, timed conditions to build mastery.";
  }

  const uniqueStrengths = [...new Set(allStrengths)].slice(0, 3);
  const uniqueWeaknesses = [...new Set(allWeaknesses)].slice(0, 3);
  const uniqueSuggestions = [...new Set(allSuggestions)].slice(0, 3);

  const recommendedTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 3);

  return {
    overallScore: avgOverall,
    technicalScore: avgTech,
    communicationScore: avgComm,
    confidenceScore: avgConf,
    strengths: uniqueStrengths,
    weaknesses: uniqueWeaknesses,
    suggestions: uniqueSuggestions,
    coachingInsight,
    recommendedTopics: recommendedTopics.length > 0 ? recommendedTopics : ['Asymptotic Performance', 'Design Patterns', 'Composure & Delivery']
  };
}
