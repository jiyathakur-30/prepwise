import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, ChevronRight, Sparkles, RefreshCw, Clock, Award, 
  Cpu, Heart, ShieldCheck, Flame, Users, Zap, Terminal, Activity, HelpCircle
} from 'lucide-react';
import { mockQuestions } from '../data/mockQuestions';
import { roles } from '../data/roles';
import { personalities } from '../data/personalities';
import { evaluateAnswer, calculateSessionStats } from '../utils/evaluation';
import QuestionCard from '../components/QuestionCard';
import AnimatedButton from '../components/AnimatedButton';
import DashboardCard from '../components/DashboardCard';
import ProgressBar from '../components/ProgressBar';

// Import Web Audio Synthesizers
import { 
  playHologramStart, playScanPulse, playHoverTick, 
  playScoreRevealNote, playUpgradeChime 
} from '../utils/audio';

const FILLER_WORDS = [/\bum\b/i, /\buh\b/i, /\blike\b/i, /\bbasically\b/i, /\bactually\b/i, /\bliterally\b/i];
const TRANSITION_PHRASES = [/\bfirstly\b/i, /\bfor example\b/i, /\bspecifically\b/i, /\bhowever\b/i, /\btherefore\b/i, /\bunder the hood\b/i];
const STAR_SITUATION = [/\bsituation\b/i, /\btask\b/i, /\bproject\b/i, /\bdeadline\b/i, /\bcontext\b/i];
const STAR_ACTION = [/\baction\b/i, /\bdid\b/i, /\bimplemented\b/i, /\bsolved\b/i, /\bled\b/i, /\bbuilt\b/i];
const STAR_RESULT = [/\bresult\b/i, /\boutcome\b/i, /\bimpact\b/i, /\bachieved\b/i, /\bconsequently\b/i];
const HESITATION_WORDS = [/\bprobably\b/i, /\bmaybe\b/i, /\bnot sure\b/i, /\bdon't know\b/i, /\bi guess\b/i];

export default function InterviewInterface() {
  const location = useLocation();
  const navigate = useNavigate();

  // Load selection parameters
  const config = location.state || {
    roleId: 'frontend-dev',
    difficulty: 'medium',
    interviewType: 'technical',
    personalityId: 'friendly-sophia'
  };

  const selectedRole = roles.find(r => r.id === config.roleId) || roles[1];
  const coach = personalities.find(p => p.id === config.personalityId) || personalities[0];

  // Core Interview states
  const [questionsList, setQuestionsList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [evaluatedQuestions, setEvaluatedQuestions] = useState([]); 
  const [currentDifficulty, setCurrentDifficulty] = useState(config.difficulty);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Staged thinking diagnostics
  const [diagnosticStage, setDiagnosticStage] = useState(0); // 0: ready, 1: tech, 2: comm, 3: conf, 4: difficulty, 5: revealed

  // Immersion parameters
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [aiStatus, setAiStatus] = useState(coach.greeting);
  const [isMicActive, setIsMicActive] = useState(false);
  
  // Adaptive follow-up overrides
  const [nestedFollowUp, setNestedFollowUp] = useState(null); 
  const [evaluationReceipt, setEvaluationReceipt] = useState(null); 

  // Observant coaching memory comment
  const [memoryInsight, setMemoryInsight] = useState('');

  // Live floating signals metrics
  const [liveMetrics, setLiveMetrics] = useState({
    techDepth: 0,
    confidence: 100,
    clarity: 0,
    structure: 0,
    relevance: 0
  });

  const textareaRef = useRef(null);

  // 1. Cinematic Hologram startup on mount & compile questions
  useEffect(() => {
    // Play sci-fi start sweep sound
    playHologramStart();

    const roleQuestions = mockQuestions[config.roleId] || mockQuestions['frontend-dev'];
    const easyQ = roleQuestions.easy || [];
    const medQ = roleQuestions.medium || [];
    const hardQ = roleQuestions.hard || [];

    let primaryPool = [];
    if (config.difficulty === 'easy') primaryPool = [...easyQ];
    else if (config.difficulty === 'hard') primaryPool = [...hardQ];
    else primaryPool = [...medQ];

    const finalPool = [...primaryPool, ...medQ, ...easyQ, ...hardQ].slice(0, 5);
    setQuestionsList(finalPool);

    // Dynamic historical memory check
    const history = JSON.parse(localStorage.getItem('prepwise_history') || '[]');
    if (history.length > 0) {
      const pastSessionsCount = history.filter(s => s.config?.roleId === config.roleId).length;
      if (pastSessionsCount > 0) {
        setMemoryInsight(`Observing continuous progression: detected past loops on this specialization track.`);
      }
    }
  }, [config.roleId, config.difficulty]);

  // 2. Chronometer Timer
  useEffect(() => {
    if (isCompleted || isEvaluating) return;
    
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, isEvaluating]);

  // 3. Real-Time Signals calculations as user types
  useEffect(() => {
    const text = answers[currentIdx] || '';
    if (!text.trim()) {
      setLiveMetrics({ techDepth: 0, confidence: 100, clarity: 0, structure: 0, relevance: 0 });
      return;
    }

    const words = text.trim().split(/\s+/);
    const WCount = words.length;

    // Technical depth & specificity
    const keywords = questionsList[currentIdx]?.keywords || [];
    let matchCount = 0;
    keywords.forEach(keyword => {
      const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      if (regex.test(text)) matchCount++;
    });
    const relevance = keywords.length > 0 ? Math.round((matchCount / keywords.length) * 100) : 100;
    const techDepth = Math.min(Math.round((matchCount * 18) + (WCount / 1.5)), 100);

    // Confidence Stability
    let fillers = 0;
    FILLER_WORDS.forEach(regex => {
      const matches = text.match(regex);
      if (matches) fillers += matches.length;
    });
    let hesitations = 0;
    HESITATION_WORDS.forEach(regex => {
      const matches = text.match(regex);
      if (matches) hesitations += matches.length;
    });
    const confidence = Math.max(100 - (fillers * 6) - (hesitations * 10), 10);

    // Communication Clarity
    let transitions = 0;
    TRANSITION_PHRASES.forEach(regex => {
      if (regex.test(text)) transitions++;
    });
    const clarity = Math.min(Math.round((transitions * 16) + (WCount > 40 ? 40 : WCount)), 100);

    // Answer Structure
    let structure = 0;
    if (questionsList[currentIdx]?.type === 'hr') {
      const situationHit = STAR_SITUATION.some(r => r.test(text)) ? 25 : 0;
      const actionHit = STAR_ACTION.some(r => r.test(text)) ? 50 : 0;
      const resultHit = STAR_RESULT.some(r => r.test(text)) ? 25 : 0;
      structure = situationHit + actionHit + resultHit;
    } else {
      const hasDefinition = /\b(is|means|refers to|represents|stands for)\b/i.test(text);
      const hasExplanation = /\b(because|since|due to|therefore|leads to)\b/i.test(text);
      const hasImplementation = /\b(under the hood|mechanics|instantiate|allocate|memory|complexity)\b/i.test(text);
      structure = (hasDefinition ? 30 : 0) + (hasExplanation ? 30 : 0) + (hasImplementation ? 40 : 0);
    }

    setLiveMetrics({ techDepth, confidence, clarity, structure, relevance });
  }, [answers, currentIdx, questionsList]);

  // Format Stopwatch
  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQuestionObj = questionsList[currentIdx];
  const activeQuestionText = nestedFollowUp || activeQuestionObj?.question || '';

  // Simulated Mic Transcription
  const toggleSpeechSimulation = () => {
    playHoverTick();
    if (isMicActive) {
      setIsMicActive(false);
      setAiStatus('Microphone closed.');
      return;
    }

    setIsMicActive(true);
    setAiStatus(`${coach.name} is listening... speak clearly.`);

    setTimeout(() => {
      if (textareaRef.current) {
        setIsMicActive(false);
        setAiStatus('Speech successfully transcribed.');
        playUpgradeChime();

        let mockSpokenTranscript = '';
        if (config.roleId === 'frontend-dev') {
          mockSpokenTranscript = "I believe optimization starts with rendering analysis. We should absolutely use code splitting using React.lazy and Suspense boundaries to keep core bundle size down. In addition, we should apply memoization with useMemo, useCallback, and React.memo to prevent unnecessary child component updates, but we must be careful with dependency arrays under the hood to prevent memory cycles.";
        } else if (config.roleId === 'python-dev') {
          mockSpokenTranscript = "The Global Interpreter Lock, or GIL, is a locking mechanism in CPython that ensures only one thread executes bytecode at a time. To bypass the GIL in CPU-bound tasks, we should use the multiprocessing module or utilize PyPy or C-extensions to achieve true parallelism under the hood.";
        } else if (config.roleId === 'hr-interview') {
          mockSpokenTranscript = "In my last project, we faced a major conflict because of tight deadlines and shifting specs. Specifically, I set up a structured discussion to listen to their concern, and as a result, we compromising on a hybrid indexing pattern. The resolved outcome was completing the project 3 days early with excellent scaling.";
        } else {
          mockSpokenTranscript = "In my engineering experience, I approach complex problems by first decomposing them into smaller interfaces. I ensure we evaluate time and space complexity, utilizing optimal structures like B-Trees and HashMaps under the hood to guarantee constant time operations and high structural clarity.";
        }

        let charIndex = 0;
        const fillTimer = setInterval(() => {
          setAnswers(prev => {
            const copy = [...prev];
            copy[currentIdx] = mockSpokenTranscript.substring(0, charIndex + 3);
            return copy;
          });
          charIndex += 3;
          if (charIndex >= mockSpokenTranscript.length) {
            clearInterval(fillTimer);
          }
        }, 10);
      }
    }, 2800);
  };

  // Submit Answer with sound cues and memory scans
  const handleSubmitAnswer = () => {
    playHoverTick();
    const currentAnswer = answers[currentIdx] || '';
    if (currentAnswer.trim().split(/\s+/).length < 5) {
      setAiStatus('Error: Response too brief. Please elaborate your thoughts.');
      return;
    }

    setIsEvaluating(true);
    setDiagnosticStage(1);
    setAiStatus(`Initializing neural diagnostic scans...`);
    playScanPulse();

    // Rhythmic staged updates with scanning clicks
    setTimeout(() => {
      setDiagnosticStage(2);
      setAiStatus('Evaluating vocabulary depth & semantic relevance...');
      playScanPulse();
      
      setTimeout(() => {
        setDiagnosticStage(3);
        setAiStatus('Scanning confidence parameters & vocal filler density...');
        playScanPulse();
        
        setTimeout(() => {
          setDiagnosticStage(4);
          setAiStatus(`Calibrating adaptive difficulty setting for ${coach.name}...`);
          playScanPulse();
          
          setTimeout(() => {
            const evaluation = evaluateAnswer(activeQuestionObj, currentAnswer, timerSeconds, config.personalityId);
            
            const receipt = {
              question: activeQuestionObj,
              questionText: activeQuestionText,
              answer: currentAnswer,
              evaluation
            };

            setEvaluatedQuestions(prev => [...prev, receipt]);
            setEvaluationReceipt(evaluation);
            setIsEvaluating(false);
            setDiagnosticStage(5); 

            // Play successful score reveals or upgrade sweeps
            if (evaluation.score >= 78) {
              playUpgradeChime();
            } else {
              playScoreRevealNote(550);
            }

            // Coach memories: observe past capabilities
            const history = JSON.parse(localStorage.getItem('prepwise_history') || '[]');
            let comparisonPhrase = '';
            if (history.length > 0) {
              const previousAvg = history[0].statistics.overallScore;
              if (evaluation.score > previousAvg) {
                comparisonPhrase = ` That demonstrated stronger specificity than your earlier attempts, Jiya.`;
              }
            }

            const action = evaluation.adaptiveAction;
            let notificationMsg = '';

            if (action === 'UPGRADE') {
              if (currentDifficulty === 'easy') setCurrentDifficulty('medium');
              else if (currentDifficulty === 'medium') setCurrentDifficulty('hard');
              else setNestedFollowUp(activeQuestionObj.adaptiveFollowUp?.harder);
              notificationMsg = `Exceptional depth. ${coach.name} has scaled up your loop complexity.${comparisonPhrase}`;
            } else if (action === 'DOWNGRADE') {
              if (currentDifficulty === 'hard') setCurrentDifficulty('medium');
              else if (currentDifficulty === 'medium') setCurrentDifficulty('easy');
              else setNestedFollowUp(activeQuestionObj.adaptiveFollowUp?.easier);
              notificationMsg = `${coach.name} calibrated difficulty limits for better alignment.`;
            } else {
              notificationMsg = `Response logged. ${coach.name} is maintaining standard pacing.`;
            }

            setAiStatus(notificationMsg);
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  // Next Question
  const handleNextQuestion = () => {
    playHoverTick();
    setNestedFollowUp(null);
    setEvaluationReceipt(null);
    setDiagnosticStage(0);

    if (currentIdx < 4) {
      setCurrentIdx(prev => prev + 1);
      const pool = mockQuestions[config.roleId] || mockQuestions['frontend-dev'];
      const currentLevelPool = pool[currentDifficulty] || pool['medium'];
      
      setQuestionsList(prev => {
        const copy = [...prev];
        const nextQCandidate = currentLevelPool[Math.floor(Math.random() * currentLevelPool.length)];
        const isAlreadyAnswered = copy.slice(0, currentIdx + 1).some(q => q.id === nextQCandidate?.id);
        if (!isAlreadyAnswered && nextQCandidate) {
          copy[currentIdx + 1] = nextQCandidate;
        }
        return copy;
      });

      setAiStatus(`${coach.name} is formulating question ${currentIdx + 2}.`);
    } else {
      setIsCompleted(true);
      setAiStatus('Session complete. Formulating final coaching scorecard...');
      playUpgradeChime();

      setTimeout(() => {
        const finalReceipts = [...evaluatedQuestions];
        const aggregatedStats = calculateSessionStats(finalReceipts);

        const newHistoryRecord = {
          id: `session_${Date.now()}`,
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
          time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
          roleTitle: selectedRole.title,
          roleIcon: selectedRole.icon,
          config,
          statistics: aggregatedStats,
          details: finalReceipts
        };

        const currentHistory = JSON.parse(localStorage.getItem('prepwise_history') || '[]');
        localStorage.setItem('prepwise_history', JSON.stringify([newHistoryRecord, ...currentHistory]));

        navigate('/dashboard', { state: { activeSession: newHistoryRecord } });
      }, 1500);
    }
  };

  const activeAnswerText = answers[currentIdx] || '';
  const wordCount = activeAnswerText.trim() === '' ? 0 : activeAnswerText.trim().split(/\s+/).length;

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-6 py-6 md:py-12 flex flex-col gap-6">
      
      {/* Session header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-brand-border gap-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center border text-xs"
            style={{ 
              borderColor: `${coach.accentColor}33`,
              backgroundColor: `${coach.accentColor}11`,
              color: coach.accentColor 
            }}
          >
            <Award size={16} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-brand-text leading-tight">{selectedRole.title} Track</h2>
            <p className="text-[10px] text-brand-muted mt-0.5">Active Coach: Sophia &bull; Calibration Loop</p>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 text-brand-muted text-xs font-medium">
            <Clock size={14} className="text-brand-primary" />
            <span>Time Elapsed:</span>
            <span className="font-mono text-brand-text font-bold bg-white/[0.03] border border-brand-border px-2 py-0.5 rounded transition-colors duration-300">
              {formatTime(timerSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
            <span>Interviewer Status:</span>
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-bold text-[10px] uppercase border"
              style={{
                backgroundColor: `${coach.accentColor}10`,
                borderColor: `${coach.accentColor}25`,
                color: coach.accentColor
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Screen Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-grow">
        
        {/* LEFT COLUMN: AI Avatar Visualizer (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <DashboardCard className="flex-grow flex flex-col justify-between items-center text-center p-8 bg-brand-card border border-brand-border h-full min-h-[420px] relative overflow-hidden transition-colors duration-300">
            
            {/* Session tracking */}
            <div className="w-full z-10">
              <div className="flex justify-between items-center text-xs font-semibold text-brand-muted mb-2">
                <span>Loop Progress</span>
                <span>Question {currentIdx + 1} of 5</span>
              </div>
              <ProgressBar value={currentIdx + (evaluationReceipt ? 1 : 0)} max={5} animate />
            </div>

            {/* Circular Hologram Avatar */}
            <div className="relative my-6 flex flex-col items-center justify-center z-10">
              
              {/* Pulsing Aura Loops */}
              <div 
                className="absolute w-44 h-44 rounded-full border animate-[ping_3.5s_infinite]"
                style={{ borderColor: `${coach.accentColor}18` }}
              />
              <div 
                className="absolute w-36 h-36 rounded-full filter blur-md animate-pulse"
                style={{ backgroundColor: `${coach.accentColor}08` }}
              />
              
              {/* Spinning Ring */}
              <div 
                className="absolute w-32 h-32 rounded-full border border-dashed animate-spin"
                style={{ borderColor: `${coach.accentColor}33`, animationDuration: '40s' }}
              />

              {/* Main Avatar Blob */}
              <div 
                className="relative w-24 h-24 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-xl z-10 border transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${coach.accentColor}, ${coach.accentColor}dd)`,
                  boxShadow: `0 8px 32px 0 ${coach.accentColor}25`,
                  borderColor: `${coach.accentColor}55`
                }}
              >
                <span className="font-display tracking-tight text-white select-none">{coach.avatarInitials}</span>
                
                {isEvaluating && (
                  <span className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
                )}
              </div>

              {/* Waveform under avatar */}
              <div className="flex items-end gap-1.5 h-6 mt-7">
                {[...Array(9)].map((_, idx) => {
                  let bounceClass = 'opacity-40';
                  if (isMicActive) {
                    bounceClass = idx % 2 === 0 ? 'animate-[pulseSubtle_0.25s_infinite_alternate]' : 'animate-[pulseSubtle_0.35s_infinite_alternate]';
                  } else if (isEvaluating) {
                    bounceClass = 'animate-[pulseSubtle_0.15s_infinite_alternate]';
                  } else if (activeAnswerText.length > 5) {
                    bounceClass = idx % 3 === 0 ? 'animate-[pulseSubtle_0.4s_infinite_alternate]' : 'opacity-60';
                  }

                  const heights = ['h-2', 'h-4', 'h-6', 'h-3', 'h-2', 'h-5', 'h-6', 'h-3.5', 'h-2'];
                  
                  return (
                    <span
                      key={idx}
                      className={`w-[3px] rounded-full transition-all duration-300 ${heights[idx]} ${bounceClass}`}
                      style={{ 
                        backgroundColor: coach.accentColor,
                        animationDelay: `${idx * 0.05}s`
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Coach Details & Status */}
            <div className="w-full flex flex-col gap-2.5 z-10">
              <span className="text-xs font-bold text-brand-text">{coach.name} ({coach.role})</span>
              
              <div className="min-h-[50px] px-4 py-2.5 rounded-xl bg-white/[0.015] border border-brand-border flex flex-col items-center justify-center gap-1 transition-colors duration-300">
                <p className="text-[11px] leading-relaxed text-brand-text font-medium transition-all">
                  {aiStatus}
                </p>
                {memoryInsight && (
                  <p className="text-[9px] text-brand-muted leading-tight font-medium italic opacity-85 mt-0.5">
                    * Coach Memory: {memoryInsight}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 mt-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Adaptive Settings:</span>
                <span 
                  className="text-[9px] font-extrabold uppercase tracking-wider bg-white/[0.03] border px-2 py-0.5 rounded"
                  style={{
                    color: currentDifficulty === 'easy' ? '#10B981' : currentDifficulty === 'medium' ? '#EAB308' : '#FF5733',
                    borderColor: currentDifficulty === 'easy' ? 'rgba(16,185,129,0.2)' : currentDifficulty === 'medium' ? 'rgba(234,179,8,0.2)' : 'rgba(255,87,51,0.2)',
                    backgroundColor: currentDifficulty === 'easy' ? 'rgba(16,185,129,0.05)' : currentDifficulty === 'medium' ? 'rgba(234,179,8,0.05)' : 'rgba(255,87,51,0.05)'
                  }}
                >
                  {currentDifficulty}
                </span>
              </div>
            </div>

          </DashboardCard>
        </div>

        {/* RIGHT COLUMN: Workspace (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Question Card */}
          <QuestionCard
            question={activeQuestionText}
            questionNumber={currentIdx + 1}
            totalQuestions={5}
            difficulty={currentDifficulty}
            type={activeQuestionObj?.type || 'technical'}
          />

          {/* Interactive Editor with Floating Live Signals Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-grow">
            
            {/* Editor Textarea (8 Cols) */}
            <DashboardCard className="md:col-span-8 flex flex-col justify-between gap-4 bg-brand-card border border-brand-border flex-grow transition-colors duration-300">
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-center text-[10px] font-bold text-brand-muted uppercase tracking-wider">
                  <span>Your Interview Response</span>
                  <span>{wordCount} words</span>
                </div>

                <div className="relative flex-grow min-h-[190px] flex">
                  <textarea
                    ref={textareaRef}
                    disabled={isEvaluating || !!evaluationReceipt}
                    value={activeAnswerText}
                    onChange={(e) => {
                      const text = e.target.value;
                      setAnswers(prev => {
                        const copy = [...prev];
                        copy[currentIdx] = text;
                        return copy;
                      });
                    }}
                    placeholder="Provide a comprehensive answer. Explain underlying tradeoffs, system architectures, or apply the STAR storytelling method..."
                    className="w-full p-4 rounded-xl bg-white/[0.015] border border-brand-border text-xs text-brand-text placeholder-brand-muted/30 outline-none focus:ring-1 focus:ring-brand-primary/40 focus:border-brand-primary/40 transition-all font-sans leading-relaxed resize-none flex-grow"
                  />

                  {/* Simulated Voice overlay */}
                  {isMicActive && (
                    <div className="absolute inset-0 bg-brand-bg/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 border border-brand-primary/20">
                      <Activity className="animate-pulse" size={28} style={{ color: coach.accentColor }} />
                      <span className="text-xs font-bold text-brand-text animate-pulse">Transcribing Voice Track...</span>
                      <span className="text-[10px] text-brand-muted max-w-[200px] text-center leading-relaxed">
                        Analyzing spoken vocabulary and delivery structure...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Rows */}
              <div className="flex justify-between items-center pt-3.5 border-t border-brand-border gap-4">
                <button
                  type="button"
                  disabled={isEvaluating || !!evaluationReceipt}
                  onClick={toggleSpeechSimulation}
                  className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isMicActive
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-white/[0.015] border-brand-border text-brand-muted hover:text-brand-text hover:bg-white/[0.03]'
                  }`}
                  title="Simulate Speech-to-Text Transcription"
                >
                  {isMicActive ? <MicOff size={15} /> : <Mic size={15} />}
                </button>

                <div className="flex gap-3">
                  {!evaluationReceipt ? (
                    <AnimatedButton
                      onClick={handleSubmitAnswer}
                      disabled={isEvaluating || activeAnswerText.trim() === ''}
                      variant="primary"
                      glow
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider min-w-[120px]"
                    >
                      {isEvaluating ? (
                        <div className="flex items-center gap-2 justify-center">
                          <RefreshCw size={12} className="animate-spin" />
                          <span>Scoring...</span>
                        </div>
                      ) : (
                        <span>Submit Answer</span>
                      )}
                    </AnimatedButton>
                  ) : (
                    <AnimatedButton
                      onClick={handleNextQuestion}
                      variant="secondary"
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider min-w-[120px] gap-1.5 flex items-center justify-center"
                    >
                      <span>{currentIdx < 4 ? 'Next Question' : 'Finish Loop'}</span>
                      <ChevronRight size={14} />
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </DashboardCard>

            {/* FLOATING REAL-TIME SIGNALS PANEL */}
            <DashboardCard className="md:col-span-4 bg-brand-card border border-brand-border p-4 flex flex-col gap-4 justify-between h-full transition-colors duration-300">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Terminal size={14} className="text-brand-secondary animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-text">AI Signals Panel</span>
                </div>
                <p className="text-[9px] text-brand-muted leading-relaxed">
                  Real-time cognitive metrics calculated dynamically as you type.
                </p>
              </div>

              {/* Progress lines breakdown */}
              <div className="flex flex-col gap-3.5 my-2">
                {[
                  { label: 'Technical Depth', value: liveMetrics.techDepth, color: coach.accentColor },
                  { label: 'Confidence Stability', value: liveMetrics.confidence, color: '#00D4FF' },
                  { label: 'Communication Clarity', value: liveMetrics.clarity, color: '#7C5CFF' },
                  { label: 'Answer Structure', value: liveMetrics.structure, color: '#EAB308' },
                  { label: 'Keyword Relevance', value: liveMetrics.relevance, color: '#10B981' }
                ].map((metric, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[8px] font-bold text-brand-muted uppercase tracking-wider">
                      <span>{metric.label}</span>
                      <span style={{ color: metric.color }}>{metric.value}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{ 
                          width: `${metric.value}%`,
                          backgroundColor: metric.color,
                          boxShadow: `0 0 8px ${metric.color}66`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <span className="text-[8px] text-brand-muted leading-normal italic text-center mt-1 border-t border-white/[0.03] pt-2">
                * Structure scans for STAR markers in HR loops.
              </span>
            </DashboardCard>

          </div>

          {/* Staged diagnostics sequence loader */}
          <AnimatePresence>
            {isEvaluating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl border border-brand-primary/20 p-5 bg-brand-bg/60 backdrop-blur-xl flex flex-col gap-3 z-20"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-brand-border">
                  <Cpu className="text-brand-primary animate-spin" size={15} />
                  <span className="text-xs font-bold text-brand-text">Active AI Diagnostics Review</span>
                </div>
                
                <div className="flex flex-col gap-2 text-[10px] font-semibold text-brand-muted">
                  <div className="flex items-center justify-between">
                    <span className={diagnosticStage >= 1 ? 'text-brand-text' : ''}>1. Technical Vocabulary Scan</span>
                    {diagnosticStage >= 2 ? (
                      <span className="text-[#10B981] font-bold">Passed</span>
                    ) : diagnosticStage === 1 ? (
                      <span className="text-brand-primary animate-pulse font-bold">Scanning...</span>
                    ) : (
                      <span className="opacity-40">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={diagnosticStage >= 2 ? 'text-brand-text' : ''}>2. Semantic Transitions & Clarity Checks</span>
                    {diagnosticStage >= 3 ? (
                      <span className="text-[#10B981] font-bold">Passed</span>
                    ) : diagnosticStage === 2 ? (
                      <span className="text-brand-primary animate-pulse font-bold">Scanning...</span>
                    ) : (
                      <span className="opacity-40">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={diagnosticStage >= 3 ? 'text-brand-text' : ''}>3. Confidence & Crutch Word Tracker</span>
                    {diagnosticStage >= 4 ? (
                      <span className="text-[#10B981] font-bold">Passed</span>
                    ) : diagnosticStage === 3 ? (
                      <span className="text-brand-primary animate-pulse font-bold">Scanning...</span>
                    ) : (
                      <span className="opacity-40">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={diagnosticStage >= 4 ? 'text-brand-text' : ''}>4. Calibrating Next Loop Pacing</span>
                    {diagnosticStage >= 5 ? (
                      <span className="text-[#10B981] font-bold">Calibrated</span>
                    ) : diagnosticStage === 4 ? (
                      <span className="text-brand-primary animate-pulse font-bold">Processing...</span>
                    ) : (
                      <span className="opacity-40">Pending</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SCORECARD REVEAL OVERLAY */}
          <AnimatePresence>
            {evaluationReceipt && !isEvaluating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                className="rounded-2xl border border-brand-border p-6 bg-white/[0.015] backdrop-blur-xl flex flex-col gap-4 relative overflow-hidden transition-colors duration-300"
              >
                {/* Background glow matching coach */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[60px] pointer-events-none opacity-30" 
                  style={{ backgroundColor: coach.accentColor }}
                />

                <div className="flex justify-between items-center pb-3 border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} style={{ color: coach.accentColor }} />
                    <span className="text-xs font-bold text-brand-text">AI Scorecard Summary</span>
                  </div>
                  <span 
                    className="text-xs font-extrabold px-2.5 py-0.5 rounded border"
                    style={{
                      color: coach.accentColor,
                      borderColor: `${coach.accentColor}33`,
                      backgroundColor: `${coach.accentColor}10`
                    }}
                  >
                    Scored: {evaluationReceipt.score}%
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-xs">
                  {/* Coach custom commentary */}
                  <div className="p-3.5 rounded-xl bg-white/[0.015] border border-brand-border leading-relaxed text-brand-text font-medium flex flex-col gap-1 transition-colors duration-300">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: coach.accentColor }}>
                      {coach.name}'s Feedback:
                    </span>
                    <p className="text-[11px] italic">
                      "{evaluationReceipt.behavioralDiagnostics?.coachCommentary}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-brand-text flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        Key Strength
                      </span>
                      <p className="text-[10px] text-brand-muted leading-relaxed pl-3">
                        {evaluationReceipt.feedback.strengths[0]}
                      </p>
                    </div>
                    
                    {/* Suggestion */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-brand-secondary flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                        AI Suggestion
                      </span>
                      <p className="text-[10px] text-brand-muted leading-relaxed pl-3">
                        {evaluationReceipt.feedback.suggestions[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
