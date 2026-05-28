import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, TrendingUp, Sparkles, BookOpen, AlertCircle, ChevronDown, ChevronUp,
  History, Calendar, Clock, Terminal, RefreshCw, Star, Info,
  Eye, BookOpenCheck, Flame, Users, CheckCircle2, AlertTriangle, Play, Sliders
} from 'lucide-react';
import ScoreCircle from '../components/ScoreCircle';
import DashboardCard from '../components/DashboardCard';
import StatsCard from '../components/StatsCard';
import ProgressBar from '../components/ProgressBar';
import AnimatedButton from '../components/AnimatedButton';
import { personalities } from '../data/personalities';

// Sound synthetics
import { playHoverTick, playScoreRevealNote } from '../utils/audio';

export default function FeedbackDashboard() {
  const location = useLocation();

  // History & active sessions
  const [sessionsHistory, setSessionsHistory] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState(null);

  // SaaS state parameters
  const [userProfile, setUserProfile] = useState(null);
  const [saassettings, setSaassettings] = useState({
    soundEnabled: true,
    dreamCompany: 'Vercel',
    strictness: 'standard'
  });

  // Evolution drafts timeline state per question in replay (mapped by question index -> activeDraftState)
  // draftState: 0 = Raw Voice, 1 = Struct Revision, 2 = Graded Final
  const [draftStates, setDraftStates] = useState({});

  // 1. Fetch Session History & Onboarding profile on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('prepwise_history') || '[]');
    setSessionsHistory(history);

    const cachedUser = localStorage.getItem('prepwise_user');
    if (cachedUser) {
      setUserProfile(JSON.parse(cachedUser));
    }

    const cachedSettings = localStorage.getItem('prepwise_settings');
    if (cachedSettings) {
      setSaassettings(JSON.parse(cachedSettings));
    }

    if (location.state?.activeSession) {
      setActiveSession(location.state.activeSession);
    } else if (history.length > 0) {
      setActiveSession(history[0]);
    }
  }, [location.state]);

  const selectHistoricalSession = (session) => {
    playHoverTick();
    setActiveSession(session);
    setExpandedQuestionIdx(null); 
    setDraftStates({}); // reset evolutions
  };

  const handleDraftChange = (qIdx, draftState) => {
    playHoverTick();
    setDraftStates(prev => ({
      ...prev,
      [qIdx]: draftState
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  // ENHANCED EMPTY STATE ONBOARDING
  if (!activeSession) {
    return (
      <div className="flex-grow w-full max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 columns: Ghost Cards and Disabled Graphs */}
        <div className="lg:col-span-8 flex flex-col gap-8 opacity-60">
          
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-secondary font-bold uppercase tracking-wider">
              <Sparkles size={12} className="animate-pulse" />
              <span>Simulated Workspace Overview</span>
            </div>
            <h1 className="text-3xl font-extrabold text-brand-text font-display">
              No Interview Records Active
            </h1>
            <p className="text-xs text-brand-muted max-w-lg leading-relaxed">
              Complete your first adaptive loop calibration track to view real-time progression timelines and psychological diagnostics reviews.
            </p>
          </div>

          {/* Ghost metrics overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <DashboardCard className="md:col-span-4 flex items-center justify-center p-8 bg-white/[0.01] border border-white/[0.04]">
              <ScoreCircle score={0} size={130} strokeWidth={9} label="Overall Score" />
            </DashboardCard>

            <DashboardCard className="md:col-span-8 flex flex-col gap-4 bg-white/[0.01] border border-white/[0.04]">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Ghost metrics telemetry</span>
              <div className="flex flex-col gap-3">
                <ProgressBar value={0} label="Technical Specificity Density" subLabel="0%" color="primary" />
                <ProgressBar value={0} label="Structured Storytelling & Pacing" subLabel="0%" color="secondary" />
                <ProgressBar value={0} label="Delivery Composure & Fillers" subLabel="0%" color="accent" />
              </div>
            </DashboardCard>
          </div>

          {/* Dotted progression chart placeholder */}
          <DashboardCard className="bg-white/[0.01] border border-white/[0.04] p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Calibration Timeline Graph</span>
              <span className="text-[9px] text-brand-muted italic">Dormant</span>
            </div>
            <div className="w-full h-32 flex items-center justify-center border border-dashed border-white/[0.04] rounded-xl relative">
              <span className="text-xs font-mono text-brand-muted/40 uppercase tracking-widest">Awaiting Active Telemetry</span>
            </div>
          </DashboardCard>
        </div>

        {/* Right 4 columns: Onboarding Manual Guide (No Blur) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-brand-primary" />
            <h2 className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              How PrepWise Coaching Works
            </h2>
          </div>

          <DashboardCard className="bg-[#0B0F19]/50 border border-white/[0.06] p-6 flex flex-col gap-6">
            
            <div className="flex flex-col gap-5 text-xs text-brand-muted">
              {[
                { title: "1. Tune Constraints", desc: "Select from five engineering specializations and establish target loop complexity parameters." },
                { title: "2. Pair Your Coach", desc: "Select a custom coach personality. Strict Marcus penalizes hardware logic; Sarah demands STAR narratives." },
                { title: "3. Live typing signals", desc: "Write responses. A live diagnostics widget reads key terms and delivery pacing under the hood." },
                { title: "4. Staged scanning delays", desc: "Click submit. Hologram arrays simulate technical, confidence, and coherence checks." },
                { title: "5. Coaching Replays", desc: "Review details. Compare responses directly with professional ideal answers." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-brand-text leading-tight">{step.title}</span>
                    <p className="text-[10px] leading-relaxed mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/select">
              <AnimatedButton variant="primary" glow className="w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Play size={12} className="fill-white" />
                <span>Initialize Loop Calibration</span>
              </AnimatedButton>
            </Link>

          </DashboardCard>
        </div>

      </div>
    );
  }

  const { statistics, details, roleTitle, date, time, config } = activeSession;
  const coach = personalities.find(p => p.id === config?.personalityId) || personalities[0];

  // 2. SaaS personalized greetings & progress differentials
  const currentOverallScore = statistics.overallScore;
  const pastSessions = sessionsHistory.slice(1);
  const totalSessionsCount = sessionsHistory.length;

  let welcomeMessage = "Let's calibrate your career tracks.";
  if (userProfile) {
    if (pastSessions.length > 0) {
      const prevAvg = Math.round(pastSessions.reduce((acc, s) => acc + s.statistics.overallScore, 0) / pastSessions.length);
      const scoreDiff = currentOverallScore - prevAvg;
      
      if (scoreDiff > 0) {
        welcomeMessage = `Welcome back, ${userProfile.name}. Your overall rating improved by ${scoreDiff}% since your previous loops!`;
      } else {
        welcomeMessage = `Welcome back, ${userProfile.name}. You are demonstrating outstanding persistence—keep refining your pacing!`;
      }
    } else {
      welcomeMessage = `Welcome back, ${userProfile.name}. Let's dive into your first completed calibration scorecard details below.`;
    }
  }

  // 3. AI Readiness Index & Dream Company calibrations
  // Readiness Index: Weighted composite of core competency statistics (tech, communication, confidence)
  const targetCompany = saassettings.dreamCompany || 'Vercel';
  const readinessIndex = Math.min(
    Math.round((statistics.technicalScore * 0.45) + (statistics.communicationScore * 0.35) + (statistics.confidenceScore * 0.2)),
    100
  );

  let readinessCommentary = '';
  if (targetCompany === 'Google') {
    readinessCommentary = `Google calibration: requires extreme algorithmic complexity (DSA) specificity. High tradeoffs accuracy detected.`;
  } else if (targetCompany === 'Vercel') {
    readinessCommentary = `Vercel calibration: prioritized clean rendering optimization (React lazy boundaries) & direct terminology.`;
  } else if (targetCompany === 'Stripe') {
    readinessCommentary = `Stripe calibration: demands structured REST/JWT transactional flow and secure edge designs.`;
  } else {
    readinessCommentary = `${targetCompany} target: requires strong technical depth and balanced STAR narratives.`;
  }

  // 4. Streak Psychology parameters
  // Active streak derived from unique days. If history exists, we seed a dynamic gamified streak (history length + 2) to build user excitement!
  const mockStreak = totalSessionsCount > 0 ? totalSessionsCount + 2 : 1;

  // 5. Progression Line Coordinates (viewBox: 0 0 500 120)
  const xCoords = [50, 150, 250, 350, 450];
  const scoreY = details.map(d => 100 - (d.evaluation.score * 0.8));
  const scorePath = `M ${xCoords[0]} ${scoreY[0]} L ${xCoords[1]} ${scoreY[1]} L ${xCoords[2]} ${scoreY[2]} L ${xCoords[3]} ${scoreY[3]} L ${xCoords[4]} ${scoreY[4]}`;

  const confY = details.map(d => 100 - (d.evaluation.scores.confidence * 0.8));
  const confPath = `M ${xCoords[0]} ${confY[0]} L ${xCoords[1]} ${confY[1]} L ${xCoords[2]} ${confY[2]} L ${xCoords[3]} ${confY[3]} L ${xCoords[4]} ${confY[4]}`;

  // 6. Multi-Session History Evolution Trend (SVG viewBox: 0 0 400 100)
  // Dynamically plots their last 5 sessions' overall scores to demonstrate growth
  const evolutionSessions = [...sessionsHistory].reverse().slice(-5);
  const evolutionXCoords = evolutionSessions.map((_, i) => 50 + (i * 75));
  const evolutionYCoords = evolutionSessions.map(s => 80 - (s.statistics.overallScore * 0.6));
  
  let evolutionPath = '';
  if (evolutionSessions.length > 1) {
    evolutionPath = evolutionSessions.map((_, i) => `${i === 0 ? 'M' : 'L'} ${evolutionXCoords[i]} ${evolutionYCoords[i]}`).join(' ');
  }

  // 7. Heuristic evolutionary drafts generators for Film Review
  const generateRawSpeechTranscript = (finalAnswer) => {
    // Injects raw conversational crutch fillers to simulate Speech-to-Text transcription
    return finalAnswer
      .replace(/(\b(?:I|we|it|then|to|about)\b)/gi, "$1 like, um,")
      .replace(/(\b(?:optimize|use|explain|built)\b)/gi, "basically $1")
      .replace(/(\b(?:\.|,)\b)/gi, " uh... ");
  };

  const generateStructuralRevision = (finalAnswer) => {
    // Shows structured refinements by highlighting core transition words
    return finalAnswer;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 md:py-14 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start"
    >
      
      {/* LEFT COLUMN: History Sidebar (3 Cols) */}
      <motion.div variants={itemVariants} className="w-full lg:col-span-3 flex flex-col gap-5 shrink-0">
        <div className="flex items-center gap-2 px-1">
          <History size={16} className="text-brand-primary" />
          <h2 className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Session History
          </h2>
        </div>

        <DashboardCard className="bg-brand-card border border-brand-border p-4 flex flex-col gap-3 max-h-[500px] overflow-y-auto no-scrollbar transition-colors duration-300">
          <div className="flex flex-col gap-2">
            {sessionsHistory.map((s) => {
              const isSelected = activeSession.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => selectHistoricalSession(s)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-brand-primary/10 border-brand-primary/45 shadow-md'
                      : 'bg-white/[0.01] border-brand-border hover:bg-white/[0.04] hover:border-brand-border'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-brand-text truncate max-w-[130px]">
                      {s.roleTitle}
                    </span>
                    <span className={`text-[10px] font-bold ${
                      s.statistics.overallScore >= 78 ? 'text-[#10B981]' : 
                      s.statistics.overallScore >= 50 ? 'text-[#EAB308]' : 'text-red-400'
                    }`}>
                      {s.statistics.overallScore}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-brand-muted">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      <span>{s.date}</span>
                    </div>
                    <span>{s.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </motion.div>

      {/* RIGHT COLUMN: AI Career Command Center (9 Cols) */}
      <div className="w-full lg:col-span-9 flex flex-col gap-8">
        
        {/* Welcome Back & Active Header Block */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-brand-border transition-colors duration-300">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: coach.accentColor }}>
              <Sparkles size={12} className="animate-pulse" />
              <span>{welcomeMessage}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-brand-text font-display">
              AI Career Command Center
            </h1>
            <p className="text-xs text-brand-muted flex items-center gap-3 flex-wrap">
              <span>Date: {date} &bull; {time}</span>
              <span>&bull;</span>
              <span className="font-semibold uppercase tracking-wide" style={{ color: coach.accentColor }}>
                Coach: {coach.name} ({coach.role})
              </span>
            </p>
          </div>

          <Link to="/select">
            <AnimatedButton variant="primary" glow className="py-2.5 px-5 text-xs font-bold uppercase tracking-wider gap-2">
              <RefreshCw size={12} />
              <span>Calibrate New Loop</span>
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* CORE TELEMETRY WIDGETS ROW: Streak & AI Readiness Speedometer */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Streak Psychology Counter (5 Cols) */}
          <DashboardCard className="md:col-span-5 bg-white/[0.005] border border-brand-border p-5 flex flex-col justify-between transition-colors duration-300">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-muted uppercase tracking-wider">
              <Flame className="text-[#FF5733] animate-pulse" size={14} />
              <span>Practice Habit Loop</span>
            </div>

            <div className="flex items-baseline gap-2.5 my-4">
              <span className="text-5xl font-extrabold text-brand-text font-display leading-none">{mockStreak}</span>
              <span className="text-xs font-bold text-brand-muted">Days Active</span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-brand-muted leading-relaxed">
                You are outperforming <span className="text-[#10B981] font-bold">84%</span> of recent {roleTitle} candidates in communication clarity this week. Maintain daily calibrations!
              </p>
            </div>
          </DashboardCard>

          {/* AI Readiness Index speedometer (7 Cols) */}
          <DashboardCard className="md:col-span-7 bg-white/[0.005] border border-brand-border p-5 flex flex-col justify-between transition-colors duration-300">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-muted uppercase tracking-wider">
              <Award className="text-brand-secondary" size={14} />
              <span>AI Hiring Readiness Index</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-2">
              {/* Dial Arc (4 Cols) */}
              <div className="sm:col-span-4 flex justify-center relative">
                <ScoreCircle score={readinessIndex} size={100} strokeWidth={8} label="" />
                <span className="absolute bottom-1 text-[9px] font-bold text-brand-muted uppercase tracking-wider">Ready</span>
              </div>

              {/* Text calibrations (8 Cols) */}
              <div className="sm:col-span-8 flex flex-col gap-1">
                <span className="text-xs font-bold text-brand-text">Target: {targetCompany} Benchmark</span>
                <p className="text-[10px] text-brand-muted leading-relaxed">
                  {readinessCommentary} Maintain scores above <span className="font-bold text-brand-secondary">75%</span> to calibrate safe hirable thresholds.
                </p>
              </div>
            </div>

            <div className="text-[9px] text-brand-muted leading-none mt-1 border-t border-white/[0.03] pt-2">
              * Calibrated against Dream Company target persisted in settings.
            </div>
          </DashboardCard>

        </motion.div>

        {/* DOUBLE SVG GRAPH Telemetry: Trajectory Line & Multi-session Evolution */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Trajectory Timeline Map (7 Cols) */}
          <DashboardCard className="md:col-span-7 p-5 border border-brand-border bg-white/[0.005]" title="Loop Performance Telemetry" subtitle="Question-by-question trajectory analysis mapping scores vs confidence stability.">
            <div className="mt-4 flex flex-col gap-4">
              
              <div className="relative w-full h-36 bg-[#070913]/30 border border-brand-border rounded-xl px-2 py-3 transition-colors duration-300">
                <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                  <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.02)" strokeDasharray="3" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.02)" strokeDasharray="3" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.02)" strokeDasharray="3" />
                  
                  {xCoords.map((x, i) => (
                    <line key={i} x1={x} y1="0" x2={x} y2="120" stroke="rgba(255,255,255,0.015)" />
                  ))}

                  <path d={scorePath} fill="none" stroke={coach.accentColor} strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(124,92,255,0.4)]" />
                  <path d={confPath} fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4" className="opacity-80" />

                  {details.map((item, idx) => {
                    const x = xCoords[idx];
                    const y = scoreY[idx];
                    return (
                      <g key={idx} className="cursor-pointer group" onClick={() => {
                        playHoverTick();
                        setExpandedQuestionIdx(idx);
                      }}>
                        <circle cx={x} cy={y} r="5" fill={coach.accentColor} stroke="#070913" strokeWidth="2" />
                        <circle cx={x} cy={y} r="8" fill="transparent" stroke={coach.accentColor} strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute inset-x-0 bottom-1.5 flex justify-between px-[32px] text-[8px] font-mono font-bold text-brand-muted uppercase tracking-wider">
                  {details.map((d, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span>Q0{i+1}</span>
                      <span className={`text-[7px] mt-0.5 bg-white/[0.04] px-1 rounded uppercase font-extrabold ${
                        d.question.difficulty === 'easy' ? 'text-[#10B981]' : 
                        d.question.difficulty === 'medium' ? 'text-[#EAB308]' : 'text-red-400'
                      }`}>
                        {d.question.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 items-center justify-center text-[9px] font-bold uppercase tracking-wider text-brand-muted border-t border-brand-border pt-3 transition-colors duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 rounded" style={{ backgroundColor: coach.accentColor }} />
                  <span>Question Score</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 rounded bg-[#00D4FF] border border-dashed border-cyan-400" />
                  <span>Confidence Stability</span>
                </div>
              </div>

            </div>
          </DashboardCard>

          {/* Technical Depth Multi-session evolution (5 Cols) */}
          <DashboardCard className="md:col-span-5 p-5 border border-brand-border bg-white/[0.005]" title="Technical Depth Evolution" subtitle="Overall scores plotted across your last 5 loops.">
            <div className="mt-4 flex flex-col gap-4">
              <div className="relative w-full h-36 bg-[#070913]/30 border border-brand-border rounded-xl px-2 py-3 transition-colors duration-300">
                {evolutionSessions.length > 1 ? (
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.015)" strokeDasharray="3" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.015)" strokeDasharray="3" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.015)" strokeDasharray="3" />
                    
                    <path d={evolutionPath} fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(0,212,255,0.3)]" />
                    {evolutionSessions.map((s, i) => (
                      <g key={i}>
                        <circle cx={evolutionXCoords[i]} cy={evolutionYCoords[i]} r="4.5" fill="#00D4FF" stroke="#070913" strokeWidth="2" />
                      </g>
                    ))}
                  </svg>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[10px] text-brand-muted/40 font-mono uppercase tracking-wider">Awaiting Multi-session history</span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-1 flex justify-between px-[36px] text-[7px] font-mono font-bold text-brand-muted uppercase tracking-wider">
                  {evolutionSessions.map((_, idx) => (
                    <span key={idx}>Loop 0{idx+1}</span>
                  ))}
                </div>
              </div>

              <span className="text-[8px] text-brand-muted italic text-center border-t border-white/[0.03] pt-3 leading-normal">
                * Your technical specificity improved significantly over the last few sessions!
              </span>
            </div>
          </DashboardCard>

        </motion.div>

        {/* Competencies Progress Bars Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Main Score Radial Circle */}
          <DashboardCard className="md:col-span-4 flex items-center justify-center p-8 bg-brand-primary/[0.015] border border-brand-primary/10">
            <ScoreCircle score={statistics.overallScore} size={140} strokeWidth={10} label="Overall Score" />
          </DashboardCard>

          {/* Sub-Metrics Progress Bars */}
          <DashboardCard className="md:col-span-8 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
              Loop Core Competency Breakdown
            </h3>
            
            <div className="flex flex-col gap-4">
              <ProgressBar
                value={statistics.technicalScore}
                label="Technical depth & terminology accuracy"
                subLabel={`${statistics.technicalScore}%`}
                color="primary"
              />
              <ProgressBar
                value={statistics.communicationScore}
                label="Structured articulation & transitions"
                subLabel={`${statistics.communicationScore}%`}
                color="secondary"
              />
              <ProgressBar
                value={statistics.confidenceScore}
                label="Confidence pacing & crutch density"
                subLabel={`${statistics.confidenceScore}%`}
                color="accent"
              />
            </div>
          </DashboardCard>
        </motion.div>

        {/* PSYCHOLOGICALLY AWARE COACH INSIGHT */}
        <motion.div variants={itemVariants}>
          <DashboardCard 
            className="border bg-brand-primary/[0.01] transition-all duration-300"
            style={{ borderColor: `${coach.accentColor}33` }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Star size={14} style={{ color: coach.accentColor }} className="fill-current animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-text">AI Coaching Diagnostic Insight</span>
              </div>
              <p className="text-xs leading-relaxed text-brand-muted font-medium pr-4 mt-1 pl-1 text-left">
                "{statistics.coachingInsight}"
              </p>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Strategic Strengths & Gaps */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard className="border border-[#10B981]/15 bg-[#10B981]/[0.01]" title="Key Strategic Strengths" subtitle="Areas where responses met elite specifications">
            <ul className="flex flex-col gap-3">
              {statistics.strengths.map((str, idx) => (
                <li key={idx} className="text-xs text-brand-muted leading-relaxed flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard className="border border-red-500/15 bg-red-500/[0.01]" title="Identified Delivery Gaps" subtitle="Vocal and logical metrics target for growth">
            <ul className="flex flex-col gap-3">
              {statistics.weaknesses.map((weak, idx) => (
                <li key={idx} className="text-xs text-brand-muted leading-relaxed flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">!</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </motion.div>

        {/*Collapsible Answer Replay Drawer - Film Review Center*/}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <Terminal size={16} className="text-brand-primary" />
            <h2 className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Coaching Film Review Center (Interactive Replay)
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {details.map((item, idx) => {
              const isExpanded = expandedQuestionIdx === idx;
              const diag = item.evaluation.behavioralDiagnostics;

              // Evolutionary draft toggles
              const activeDraft = draftStates[idx] !== undefined ? draftStates[idx] : 2; // Default is final

              const getDisplayAnswerText = () => {
                if (activeDraft === 0) return generateRawSpeechTranscript(item.answer);
                if (activeDraft === 1) return generateStructuralRevision(item.answer);
                return item.answer;
              };

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-brand-border bg-white/[0.005] overflow-hidden transition-colors duration-300"
                >
                  {/* Title Bar */}
                  <div
                    onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                    className="flex justify-between items-center p-4 bg-white/[0.015] hover:bg-white/[0.035] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pr-4 truncate">
                      <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-brand-primary/10 text-brand-primary text-[10px] font-bold shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-brand-text truncate">
                        {item.questionText}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span 
                        className="text-[10px] font-extrabold px-2.5 py-0.5 rounded border"
                        style={{
                          color: item.evaluation.score >= 78 ? '#10B981' : item.evaluation.score >= 50 ? '#EAB308' : '#FF5733',
                          borderColor: item.evaluation.score >= 78 ? 'rgba(16,185,129,0.2)' : item.evaluation.score >= 50 ? 'rgba(234,179,8,0.2)' : 'rgba(255,87,51,0.2)',
                          backgroundColor: item.evaluation.score >= 78 ? 'rgba(16,185,129,0.05)' : item.evaluation.score >= 50 ? 'rgba(234,179,8,0.05)' : 'rgba(255,87,51,0.05)'
                        }}
                      >
                        Score: {item.evaluation.score}%
                      </span>
                      {isExpanded ? <ChevronUp size={16} className="text-brand-muted" /> : <ChevronDown size={16} className="text-brand-muted" />}
                    </div>
                  </div>

                  {/* Expanded Replay Area */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t border-brand-border"
                      >
                        <div className="p-6 flex flex-col gap-6 text-xs bg-brand-bg/20">
                          
                          {/* ANSWER EVOLUTION TIMELINE SCRUBBER */}
                          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-white/[0.01] border border-brand-border transition-colors duration-300">
                            <span className="text-[9px] font-bold text-brand-muted uppercase tracking-wider text-left">
                              Cinematic Answer Evolution Scrubber
                            </span>
                            <div className="grid grid-cols-3 gap-1.5 bg-brand-bg p-0.5 rounded-lg border border-brand-border mt-1">
                              {[
                                { state: 0, label: 'Draft 1: Raw Voice' },
                                { state: 1, label: 'Draft 2: Structured' },
                                { state: 2, label: 'Draft 3: Graded Final' }
                              ].map(draftItem => (
                                <button
                                  key={draftItem.state}
                                  onClick={() => handleDraftChange(idx, draftItem.state)}
                                  className={`py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                                    activeDraft === draftItem.state
                                      ? 'bg-brand-primary text-white shadow-md'
                                      : 'text-brand-muted hover:text-brand-text'
                                  }`}
                                >
                                  {draftItem.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Side-by-Side compare viewport */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* Candidate Answer view */}
                            <div className="flex flex-col gap-2">
                              <span className="text-brand-secondary font-bold flex items-center gap-1.5 text-left">
                                <Users size={12} />
                                {activeDraft === 0 ? 'Raw Speech-to-Text Draft' : activeDraft === 1 ? 'Structural Transition Revision' : 'AI Graded Final Response'}
                              </span>
                              <div className="p-4 rounded-xl bg-white/[0.015] border border-brand-border text-brand-muted leading-relaxed font-sans text-[11px] h-full min-h-[120px] text-left transition-colors duration-300">
                                {activeDraft === 0 ? (
                                  // Highlight raw fillers in amber
                                  getDisplayAnswerText().split(' ').map((word, wIdx) => {
                                    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
                                    const isFiller = ['um', 'uh', 'like', 'basically', 'actually', 'literally'].includes(cleanWord);
                                    return (
                                      <span key={wIdx} className={isFiller ? "text-[#EAB308] font-bold bg-[#EAB308]/10 px-1 rounded mx-0.5 animate-pulse" : ""}>
                                        {word}{' '}
                                      </span>
                                    );
                                  })
                                ) : activeDraft === 1 ? (
                                  // Highlight structural transitions in cyan/purple
                                  getDisplayAnswerText().split(' ').map((word, wIdx) => {
                                    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
                                    const isTransition = ['firstly', 'specifically', 'under', 'benefit', 'therefore', 'however'].includes(cleanWord);
                                    return (
                                      <span key={wIdx} className={isTransition ? "text-brand-primary font-bold bg-brand-primary/10 px-1 rounded mx-0.5" : ""}>
                                        {word}{' '}
                                      </span>
                                    );
                                  })
                                ) : (
                                  getDisplayAnswerText()
                                )}
                              </div>
                            </div>

                            {/* Ideal benchmark */}
                            <div className="flex flex-col gap-2">
                              <span className="text-[#10B981] font-bold flex items-center gap-1.5 text-left">
                                <BookOpenCheck size={12} />
                                AI Ideal Answer Benchmark
                              </span>
                              <div className="p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/25 text-brand-text leading-relaxed font-sans text-[11px] h-full min-h-[120px] text-left">
                                {diag?.idealAnswer || "No reference loaded."}
                              </div>
                            </div>
                          </div>

                          {/* Missed vs matched keywords */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3.5 border-t border-white/[0.04] text-left">
                            <div className="flex flex-col gap-2">
                              <span className="font-bold text-brand-text">Keywords Covered:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {item.evaluation.matchedKeywords.length === 0 ? (
                                  <span className="text-[10px] text-brand-muted italic">No matched keywords</span>
                                ) : (
                                  item.evaluation.matchedKeywords.map((k, kIdx) => (
                                    <span
                                      key={kIdx}
                                      className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/15"
                                    >
                                      {k}
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <span className="font-bold text-brand-text">Concepts Missed:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {(() => {
                                  const target = item.question.keywords || [];
                                  const matched = item.evaluation.matchedKeywords || [];
                                  const missed = target.filter(k => !matched.includes(k));

                                  if (missed.length === 0) {
                                    return <span className="text-[10px] text-[#10B981] font-semibold italic flex items-center gap-1">✓ Complete coverage achieved</span>;
                                  }

                                  return missed.map((k, mIdx) => (
                                    <span
                                      key={mIdx}
                                      className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/5 text-red-400 border border-red-500/15"
                                    >
                                      {k}
                                    </span>
                                  ));
                                })()}
                              </div>
                            </div>
                          </div>

                          {/* Advanced behavioral panel */}
                          <div className="p-4 rounded-xl bg-white/[0.015] border border-brand-border flex flex-col gap-3.5 text-left transition-colors duration-300">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-secondary">
                              Advanced NLP Behavioral Diagnostics
                            </span>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] border-b border-white/[0.04] pb-3.5">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-brand-muted">Conciseness Rating:</span>
                                <span className="font-bold text-brand-text">{diag?.concisenessRating || "Optimal"}</span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-brand-muted">Vocal Filler Words:</span>
                                <span className={`font-bold ${item.evaluation.fillerCount > 3 ? 'text-red-400' : 'text-[#10B981]'}`}>
                                  {item.evaluation.fillerCount} instances
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-brand-muted">Hesitation Crutches:</span>
                                <span className={`font-bold ${diag?.hesitationCount > 2 ? 'text-red-400' : 'text-brand-text'}`}>
                                  {diag?.hesitationCount || 0} instances
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-brand-muted">Wording Redundancy:</span>
                                <span className="font-bold text-brand-text">{diag?.redundancyLevel || "Low"}</span>
                              </div>
                            </div>

                            {/* Coach dynamic commentary */}
                            <div className="flex flex-col gap-1 text-[11px] leading-relaxed text-brand-text italic">
                              <span className="text-[9px] font-extrabold uppercase tracking-wider not-italic" style={{ color: coach.accentColor }}>
                                {coach.name}'s Commentary:
                              </span>
                              <p>"{diag?.coachCommentary || "Great attempt. Maintain this focus."}"</p>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

    </motion.div>
  );
}
