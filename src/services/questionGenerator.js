// src/services/questionGenerator.js
// PrepWise Adaptive Question Generator with AI integration & Graceful Mock Fallback

import { requestGenerateQuestion } from './aiService.js';
import { mockQuestions } from '../data/mockQuestions.js';
import { idealAnswers } from '../data/idealAnswers.js';

/**
 * Validates whether an object matches the required Question schema.
 * 
 * @param {Object} obj 
 * @returns {boolean}
 */
function isValidQuestionSchema(obj) {
  if (!obj || typeof obj !== 'object') return false;

  const hasValidId = typeof obj.id === 'string' && obj.id.trim().length > 0;
  const hasValidQuestion = typeof obj.question === 'string' && obj.question.trim().length > 10;
  const hasValidDifficulty = ['easy', 'medium', 'hard'].includes(obj.difficulty);
  const hasValidType = ['technical', 'hr'].includes(obj.type);
  const hasValidKeywords = Array.isArray(obj.keywords) && obj.keywords.length > 0;
  const hasValidIdealAnswer = typeof obj.idealAnswer === 'string' && obj.idealAnswer.trim().length > 0;

  return hasValidId && hasValidQuestion && hasValidDifficulty && hasValidType && hasValidKeywords && hasValidIdealAnswer;
}

/**
 * Extracts a fallback question from the local mock pool.
 * 
 * @param {Object} params
 * @param {string} params.roleId
 * @param {string} params.difficulty
 * @param {string} params.interviewType
 * @param {Array<string>} params.previousQuestions
 * @returns {Object} Valid question object
 */
export function getMockFallbackQuestion({
  roleId = 'frontend-dev',
  difficulty = 'medium',
  interviewType = 'technical',
  previousQuestions = []
}) {
  const roleKey = mockQuestions[roleId] ? roleId : (interviewType === 'hr' ? 'hr-interview' : 'frontend-dev');
  const rolePool = mockQuestions[roleKey] || mockQuestions['frontend-dev'];
  const diffPool = rolePool[difficulty] || rolePool['medium'] || [];

  // Find candidate not already asked
  let selected = diffPool.find(q => !previousQuestions.includes(q.question));

  if (!selected) {
    // Fallback to any difficulty pool for this role
    const allQuestions = [...(rolePool.easy || []), ...(rolePool.medium || []), ...(rolePool.hard || [])];
    selected = allQuestions.find(q => !previousQuestions.includes(q.question)) || allQuestions[0];
  }

  const baseIdeal = idealAnswers[selected?.id] || "A structured answer demonstrating high technical comprehension and methodical reasoning.";

  return {
    id: selected?.id || `fallback_${Date.now()}`,
    question: selected?.question || "Can you explain your approach to scalable software architecture and performance optimization?",
    topic: selected?.suggestedTopics?.[0] || "Software Architecture",
    difficulty: selected?.difficulty || difficulty,
    type: selected?.type || (interviewType === 'hr' ? 'hr' : 'technical'),
    keywords: selected?.keywords || ['architecture', 'tradeoffs', 'performance', 'scalability'],
    focusReason: `Baseline competency assessment for ${roleId}`,
    idealAnswer: baseIdeal,
    isAIGenerated: false,
    suggestedTopics: selected?.suggestedTopics || ['Core Foundations'],
    adaptiveFollowUp: selected?.adaptiveFollowUp
  };
}

/**
 * Generates an interview question dynamically via AI, falling back to mock questions if needed.
 * 
 * @param {Object} params
 * @param {string} params.targetJob - Target job title or custom track
 * @param {string} params.roleId - Track specialization ID
 * @param {string} params.difficulty - 'easy' | 'medium' | 'hard'
 * @param {string} params.interviewType - 'technical' | 'hr'
 * @param {string} params.personalityId - AI Coach ID
 * @param {number} params.questionIndex - Question sequence number (0-indexed)
 * @param {Array<string>} params.previousQuestions - Strings of prior questions
 * @param {Array<Object>} params.previousEvaluations - Prior evaluation receipts
 * @returns {Promise<Object>} Formatted question object
 */
export async function generateInterviewQuestion(params) {
  const {
    targetJob,
    roleId = 'frontend-dev',
    difficulty = 'medium',
    interviewType = 'technical',
    personalityId = 'friendly-sophia',
    questionIndex = 0,
    previousQuestions = [],
    previousEvaluations = []
  } = params;

  try {
    const aiResult = await requestGenerateQuestion({
      targetJob,
      roleId,
      difficulty,
      interviewType,
      personalityId,
      questionIndex,
      previousQuestions,
      previousEvaluations
    });

    if (aiResult.success && aiResult.question && isValidQuestionSchema(aiResult.question)) {
      return {
        ...aiResult.question,
        isAIGenerated: true
      };
    } else {
      if (aiResult.error) {
        console.info('[QuestionGenerator] Server response:', aiResult.error);
      }
    }
  } catch (err) {
    console.warn('[QuestionGenerator] AI generation request error, invoking fallback:', err.message);
  }

  // Gracefully fall back to local mock question bank
  return getMockFallbackQuestion({
    roleId,
    difficulty,
    interviewType,
    previousQuestions
  });
}
