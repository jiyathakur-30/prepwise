import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Settings, Sliders, Briefcase, 
  Sparkles, ShieldCheck, Flame, Users, Zap, Info
} from 'lucide-react';
import { roles } from '../data/roles';
import { personalities } from '../data/personalities';
import RoleCard from '../components/RoleCard';
import AnimatedButton from '../components/AnimatedButton';
import DashboardCard from '../components/DashboardCard';

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [selectedRoleId, setSelectedRoleId] = useState('frontend-dev');
  const [selectedPersonalityId, setSelectedPersonalityId] = useState('friendly-sophia');
  const [difficulty, setDifficulty] = useState('medium'); 
  const [interviewType, setInterviewType] = useState('technical'); 

  const currentRole = roles.find(r => r.id === selectedRoleId);
  const currentCoach = personalities.find(p => p.id === selectedPersonalityId);

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

  const handleStartSession = () => {
    navigate('/interview', {
      state: {
        roleId: selectedRoleId,
        difficulty,
        interviewType,
        personalityId: selectedPersonalityId
      }
    });
  };

  // Get Coach Icon
  const getCoachIcon = (id) => {
    switch (id) {
      case 'friendly-sophia': return <Sparkles size={14} className="text-[#10B981]" />;
      case 'faang-vikram': return <ShieldCheck size={14} className="text-[#00D4FF]" />;
      case 'strict-marcus': return <Flame size={14} className="text-[#FF5733]" />;
      case 'hr-sarah': return <Users size={14} className="text-[#7C5CFF]" />;
      case 'founder-elon': return <Zap size={14} className="text-[#FFD700]" />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow w-full max-w-6xl mx-auto px-6 py-10 md:py-16 flex flex-col gap-10"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
          <Settings size={10} />
          <span>Session Configurator</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-text font-display">
          Customize Your Mock Interview
        </h1>
        <p className="text-xs md:text-sm text-brand-muted max-w-xl leading-relaxed">
          Select your specialization track and pair yourself with an AI coach that matches your preparation targets.
        </p>
      </motion.div>

      {/* Main Selection Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 columns: Selectable Roles and Coaches */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* TRACKS SECTION */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <Briefcase size={16} className="text-brand-primary" />
              <h2 className="text-sm font-bold text-brand-muted uppercase tracking-wider">
                1. Select Specialization Track
              </h2>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  selected={selectedRoleId === role.id}
                  onClick={() => {
                    setSelectedRoleId(role.id);
                    if (role.id === 'hr-interview') {
                      setInterviewType('hr');
                      setSelectedPersonalityId('hr-sarah'); // Auto pair with Sarah for HR track
                    } else {
                      setInterviewType('technical');
                      if (selectedPersonalityId === 'hr-sarah') {
                        setSelectedPersonalityId('faang-vikram'); // Shift away from Sarah for tech tracks
                      }
                    }
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* COACH PERSONALITIES SECTION */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <Sparkles size={16} className="text-brand-primary animate-pulse" />
              <h2 className="text-sm font-bold text-brand-muted uppercase tracking-wider">
                2. Choose Your AI Interview Coach
              </h2>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              {personalities.map((coach) => {
                const isSelected = selectedPersonalityId === coach.id;
                
                // Adjust strictness tag description
                return (
                  <div
                    key={coach.id}
                    onClick={() => {
                      // Block HR coach matching non-HR roles
                      if (selectedRoleId === 'hr-interview' && coach.id !== 'hr-sarah') {
                        return;
                      }
                      setSelectedPersonalityId(coach.id);
                    }}
                    style={{
                      borderColor: isSelected ? `${coach.accentColor}55` : undefined,
                      boxShadow: isSelected ? `0 4px 20px 0 ${coach.accentColor}11` : undefined,
                      cursor: (selectedRoleId === 'hr-interview' && coach.id !== 'hr-sarah') ? 'not-allowed' : 'pointer'
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${
                      (selectedRoleId === 'hr-interview' && coach.id !== 'hr-sarah')
                        ? 'opacity-30 border-white/[0.02] bg-transparent'
                        : isSelected
                        ? 'bg-white/[0.03] border-brand-primary'
                        : 'bg-brand-card border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="flex gap-4 items-center flex-grow">
                      {/* Coach Avatar Circle */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-sm border shadow-lg shrink-0"
                        style={{
                          backgroundColor: `${coach.accentColor}15`,
                          borderColor: `${coach.accentColor}33`,
                          color: coach.accentColor
                        }}
                      >
                        {coach.avatarInitials}
                      </div>

                      {/* Coach details */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-brand-text leading-tight">{coach.name}</span>
                          <span 
                            className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border"
                            style={{
                              backgroundColor: `${coach.accentColor}10`,
                              borderColor: `${coach.accentColor}25`,
                              color: coach.accentColor
                            }}
                          >
                            {getCoachIcon(coach.id)}
                            {coach.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-brand-muted max-w-lg leading-relaxed">
                          {coach.description}
                        </p>
                      </div>
                    </div>

                    {/* Strictness/Pressure indicator */}
                    <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 w-full md:w-auto">
                      <span className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Pressure Level</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className="w-2.5 h-1 rounded-full transition-all"
                            style={{
                              backgroundColor: idx < coach.pressureLevel ? coach.accentColor : 'rgba(255,255,255,0.06)'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] italic text-brand-muted font-medium mt-0.5">
                        {coach.focusText}
                      </span>
                    </div>

                  </div>
                );
              })}
              {selectedRoleId === 'hr-interview' && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#7C5CFF]/5 border border-[#7C5CFF]/10 text-[10px] text-brand-muted mt-1 leading-relaxed">
                  <Info size={14} className="text-brand-primary shrink-0" />
                  <span>HR Specialization is fixed to recruiter Sarah to guarantee pure STAR behavioral question matching.</span>
                </div>
              )}
            </motion.div>
          </div>

        </div>

        {/* Right 4 columns: Parameter Sliders */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-brand-primary" />
            <h2 className="text-sm font-bold text-brand-muted uppercase tracking-wider">
              3. Tune Constraints
            </h2>
          </div>

          <DashboardCard className="bg-brand-card border border-white/[0.06] flex flex-col gap-6">
            
            {/* Difficulty selector */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-brand-muted">Target Difficulty</span>
              <div className="grid grid-cols-3 gap-2">
                {['easy', 'medium', 'hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xl border text-center transition-all duration-200 ${
                      difficulty === d
                        ? d === 'easy'
                          ? 'bg-[#00FF87]/10 border-[#00FF87]/40 text-[#00FF87]'
                          : d === 'medium'
                          ? 'bg-[#EAB308]/10 border-[#EAB308]/40 text-[#EAB308]'
                          : 'bg-red-500/10 border-red-500/40 text-red-400'
                        : 'bg-white/[0.02] border-white/[0.06] text-brand-muted hover:text-brand-text hover:bg-white/[0.04]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Loop Type Selection */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-brand-muted">Session Loop Style</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'technical', label: 'Tech' },
                  { value: 'hr', label: 'HR' },
                  { value: 'mixed', label: 'Mixed' }
                ].map((typeItem) => {
                  const isDisabled = selectedRoleId === 'hr-interview' && typeItem.value !== 'hr';
                  return (
                    <button
                      key={typeItem.value}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setInterviewType(typeItem.value)}
                      className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xl border text-center transition-all duration-200 ${
                        isDisabled
                          ? 'opacity-30 cursor-not-allowed border-white/[0.03] text-brand-muted/30 bg-transparent'
                          : interviewType === typeItem.value
                          ? 'bg-brand-primary/15 border-brand-primary/40 text-brand-primary'
                          : 'bg-white/[0.02] border-white/[0.06] text-brand-muted hover:text-brand-text hover:bg-white/[0.04]'
                      }`}
                    >
                      {typeItem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Config Summary Card */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="text-brand-muted">Active Coach:</span>
                <span className="font-semibold text-brand-text" style={{ color: currentCoach?.accentColor }}>
                  {currentCoach?.name} ({currentCoach?.role})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-muted">Selected Role:</span>
                <span className="font-semibold text-brand-text">{currentRole?.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-muted">Grading Scale:</span>
                <span className="font-semibold text-brand-secondary">
                  {selectedPersonalityId === 'strict-marcus' ? 'Strict Internals Graded' : 'Standard AI Graded'}
                </span>
              </div>
            </div>

            {/* Launch button */}
            <AnimatedButton
              onClick={handleStartSession}
              variant="primary"
              glow
              className="w-full py-4 text-xs font-bold uppercase tracking-wider gap-2 flex items-center justify-center"
            >
              <span>Begin Session Loop</span>
              <ArrowRight size={14} />
            </AnimatedButton>

          </DashboardCard>
        </motion.div>
      </div>

    </motion.div>
  );
}
