import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Palette, LogOut, User, Moon, Laptop, Sun, ChevronDown, 
  Settings, Volume2, VolumeX, Briefcase, Building, ShieldAlert,
  Sliders, X, ShieldCheck, Heart, UserCheck, Flame, Zap
} from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import { playHoverTick } from '../utils/audio';

export default function Navbar({ user, theme, onChangeTheme, onLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // SaaS Settings states
  const [settings, setSettings] = useState({
    soundEnabled: true,
    motionEnabled: true,
    dreamCompany: 'Vercel',
    strictness: 'standard'
  });

  // Load settings on mount
  useEffect(() => {
    const cachedSettings = localStorage.getItem('prepwise_settings');
    if (cachedSettings) {
      setSettings(JSON.parse(cachedSettings));
    }
  }, []);

  const saveSettings = (updated) => {
    setSettings(updated);
    localStorage.setItem('prepwise_settings', JSON.stringify(updated));
  };

  const selectTheme = (newTheme) => {
    playHoverTick();
    onChangeTheme(newTheme);
    setShowThemeDropdown(false);
  };

  const getInitials = (name) => {
    if (!name) return 'PW';
    return name.split(/\s+/).map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleSettingsClick = () => {
    playHoverTick();
    setShowSettingsDrawer(true);
    setShowUserDropdown(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-bg/60 backdrop-blur-md border-b border-brand-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          
          {/* Logo */}
          <Link to="/" onClick={playHoverTick} className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-105">
              <Sparkles size={16} className="text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-brand-text">
                PrepWise
              </span>
              <span className="text-[9px] font-bold text-brand-secondary tracking-widest uppercase mt-[-3px]">
                AI Coach
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', path: '/' },
              { label: 'Dashboard', path: '/dashboard' }
            ].map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={playHoverTick}
                  className={`relative text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 py-1.5 ${
                    isActive ? 'text-brand-text font-extrabold' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Core Controls */}
          <div className="flex items-center gap-3">
            
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  playHoverTick();
                  setShowThemeDropdown(prev => !prev);
                  setShowUserDropdown(false);
                }}
                type="button"
                className="p-2.5 rounded-xl border border-brand-border bg-white/[0.02] hover:bg-white/[0.04] text-brand-muted hover:text-brand-text transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {theme === 'midnight' ? (
                  <Moon size={14} className="text-brand-primary animate-pulse" />
                ) : theme === 'graphite' ? (
                  <Laptop size={14} className="text-brand-muted" />
                ) : (
                  <Sun size={14} className="text-[#EAB308]" />
                )}
                <ChevronDown size={10} className="opacity-60" />
              </button>

              <AnimatePresence>
                {showThemeDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowThemeDropdown(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 rounded-2xl border border-brand-border bg-brand-bg/95 backdrop-blur-xl p-2 shadow-2xl flex flex-col gap-1 z-50"
                    >
                      {[
                        { id: 'midnight', label: 'Midnight Dark', icon: <Moon size={12} className="text-brand-primary" /> },
                        { id: 'graphite', label: 'Titanium Grey', icon: <Laptop size={12} className="text-brand-muted" /> },
                        { id: 'light', label: 'Crisp Slate Light', icon: <Sun size={12} className="text-[#EAB308]" /> }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => selectTheme(t.id)}
                          className={`w-full p-2.5 text-left rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                            theme === t.id 
                              ? 'bg-brand-primary/10 text-brand-primary' 
                              : 'text-brand-muted hover:text-brand-text hover:bg-white/[0.03]'
                          }`}
                        >
                          {t.icon}
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile badge dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    playHoverTick();
                    setShowUserDropdown(prev => !prev);
                    setShowThemeDropdown(false);
                  }}
                  type="button"
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-brand-border bg-white/[0.02] hover:bg-white/[0.04] text-brand-text transition-all duration-200 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-primary/15 border border-brand-primary/25 text-brand-primary flex items-center justify-center font-display font-bold text-xs shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left shrink-0 max-w-[100px]">
                    <span className="text-[10px] font-bold text-brand-text truncate leading-none">{user.name}</span>
                    <span className="text-[8px] text-brand-muted truncate mt-0.5 leading-none">{user.targetJob}</span>
                  </div>
                  <ChevronDown size={10} className="opacity-60 hidden sm:block shrink-0" />
                </button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserDropdown(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl border border-brand-border bg-brand-bg/95 backdrop-blur-xl p-3.5 shadow-2xl flex flex-col gap-3 z-50"
                      >
                        <div className="flex flex-col gap-1 border-b border-brand-border pb-3.5 text-left">
                          <span className="text-[10px] font-extrabold text-brand-text leading-none">{user.name}</span>
                          <span className="text-[9px] text-brand-muted truncate mt-1 leading-none">{user.email}</span>
                          <span className="text-[8px] font-bold text-brand-secondary uppercase tracking-widest mt-1.5 leading-none">
                            {user.targetJob}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={handleSettingsClick}
                            className="w-full p-2.5 text-left rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 text-brand-muted hover:text-brand-text hover:bg-white/[0.03] transition-all cursor-pointer"
                          >
                            <Settings size={12} className="text-brand-primary" />
                            <span>SaaS Preferences</span>
                          </button>

                          <button
                            onClick={() => {
                              playHoverTick();
                              onLogout();
                              setShowUserDropdown(false);
                            }}
                            className="w-full p-2.5 text-left rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-2 bg-red-500/10 hover:bg-red-500/15 border border-red-500/25 text-red-400 transition-all cursor-pointer"
                          >
                            <LogOut size={12} />
                            <span>End SaaS Session</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              currentPath !== '/interview' && currentPath !== '/select' && (
                <Link to="/select">
                  <AnimatedButton variant="primary" glow className="py-2 px-4 rounded-xl text-xs uppercase tracking-wider">
                    Launch Portal
                  </AnimatedButton>
                </Link>
              )
            )}

          </div>
          
        </div>
      </header>

      {/* SLIDING SETTINGS DRAWER OVERLAY */}
      <AnimatePresence>
        {showSettingsDrawer && (
          <>
            {/* Backdrop Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettingsDrawer(false)}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-brand-bg/95 border-l border-brand-border backdrop-blur-xl p-6 shadow-2xl z-50 flex flex-col justify-between"
            >
              
              <div className="flex flex-col gap-6">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <Settings className="text-brand-primary animate-spin" size={16} style={{ animationDuration: '8s' }} />
                    <h3 className="text-sm font-bold text-brand-text font-display uppercase tracking-wider">SaaS Preferences</h3>
                  </div>
                  <button 
                    onClick={() => setShowSettingsDrawer(false)} 
                    className="p-1 rounded-lg border border-brand-border hover:bg-white/[0.05] text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Settings Items */}
                <div className="flex flex-col gap-5 text-left text-xs">
                  
                  {/* Category 1 */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">1. Audio & Core Polish</span>
                    
                    {/* Sound Switch */}
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.015] border border-brand-border">
                      <div className="flex items-center gap-2">
                        {settings.soundEnabled ? <Volume2 size={14} className="text-brand-primary" /> : <VolumeX size={14} className="text-brand-muted" />}
                        <span className="font-semibold text-brand-text">Synthetic UI Audio</span>
                      </div>
                      <button
                        onClick={() => {
                          const sound = !settings.soundEnabled;
                          saveSettings({ ...settings, soundEnabled: sound });
                          if (sound) setTimeout(() => playHoverTick(), 100);
                        }}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${settings.soundEnabled ? 'bg-brand-primary' : 'bg-white/[0.06]'}`}
                      >
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${settings.soundEnabled ? 'translate-x-4.5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Motion Toggle */}
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.015] border border-brand-border">
                      <div className="flex items-center gap-2">
                        <Sliders size={14} className="text-brand-secondary" />
                        <span className="font-semibold text-brand-text">Motion & Animations</span>
                      </div>
                      <button
                        onClick={() => {
                          playHoverTick();
                          saveSettings({ ...settings, motionEnabled: !settings.motionEnabled });
                        }}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${settings.motionEnabled ? 'bg-brand-primary' : 'bg-white/[0.06]'}`}
                      >
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${settings.motionEnabled ? 'translate-x-4.5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">2. Calibration & Command</span>
                    
                    {/* Dream Company */}
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.015] border border-brand-border">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-[#EAB308]" />
                        <span className="font-semibold text-brand-text">Target Company Calibrator</span>
                      </div>
                      <select
                        value={settings.dreamCompany}
                        onChange={(e) => {
                          playHoverTick();
                          saveSettings({ ...settings, dreamCompany: e.target.value });
                        }}
                        className="w-full p-2 bg-brand-bg border border-brand-border rounded-lg text-brand-text outline-none text-[11px] font-semibold cursor-pointer"
                      >
                        <option value="Vercel">Vercel (Strict React & UI)</option>
                        <option value="Stripe">Stripe (High Architecture Clarity)</option>
                        <option value="Google">Google (Optimal DSA Complexity)</option>
                        <option value="Meta">Meta (Fast pacing scaling)</option>
                        <option value="OpenAI">OpenAI (Advanced model architectures)</option>
                      </select>
                    </div>

                    {/* strictness Calibration */}
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.015] border border-brand-border">
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={14} className="text-[#FF5733]" />
                        <span className="font-semibold text-brand-text">Evaluation strictness</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 bg-brand-bg p-0.5 rounded-lg border border-brand-border">
                        {['safe', 'standard', 'strict'].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              playHoverTick();
                              saveSettings({ ...settings, strictness: st });
                            }}
                            className={`py-1.5 text-[9px] font-bold uppercase rounded-md text-center transition-all cursor-pointer ${
                              settings.strictness === st
                                ? 'bg-brand-primary text-white'
                                : 'text-brand-muted hover:text-brand-text'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Account Footnote */}
              <div className="flex flex-col gap-3 border-t border-brand-border pt-4">
                {user && (
                  <div className="flex flex-col gap-1 text-[10px] text-left">
                    <span className="text-brand-muted">Active Onboarding Profile:</span>
                    <span className="font-bold text-brand-text flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      {user.email}
                    </span>
                    <span className="text-[8px] text-brand-muted mt-0.5">Joined: {user.joinedDate} &bull; Sandbox persistent</span>
                  </div>
                )}
                
                <AnimatedButton
                  onClick={() => setShowSettingsDrawer(false)}
                  variant="secondary"
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  Save & Apply
                </AnimatedButton>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
