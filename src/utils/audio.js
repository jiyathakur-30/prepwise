// PrepWise - Immersive Web Audio Synthesizer Engine
// Generates ultra-soft, futuristic, minimal UI sounds directly in the browser

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Helper to check if sound is enabled in localStorage
function isSoundEnabled() {
  const settings = JSON.parse(localStorage.getItem('prepwise_settings') || '{}');
  return settings.soundEnabled !== false; // Default is true
}

/**
 * Cinematic Hologram Startup Sweep (low frequency sweeping minimal sci-fi pad)
 */
export function playHologramStart() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Low Sweep Oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 1.2);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    // High shimmer frequency
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(600, now);
    osc2.frequency.linearRampToValueAtTime(900, now + 0.8);
    
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.015, now + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 1.2);
    
    osc2.start(now);
    osc2.stop(now + 0.8);
  } catch (err) {
    console.warn('AudioContext playback error', err);
  }
}

/**
 * Diagnostics Scan Pulse (subtle synthetic typing/scanning click)
 */
export function playScanPulse() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.05);
    
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {}
}

/**
 * Micro-Interaction Hover Tick (quiet click feedback on buttons)
 */
export function playHoverTick() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, now);
    
    gainNode.gain.setValueAtTime(0.005, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.015);
  } catch (e) {}
}

/**
 * Score Reveal Progressive Count-Up Note
 */
export function playScoreRevealNote(pitchHz = 440) {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitchHz, now);
    
    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {}
}

/**
 * Validation Upgrade Triad Sweep (soft major chord flourish representing score calibration improvements)
 */
export function playUpgradeChime() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C Major Chord
    
    notes.forEach((pitch, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const noteTime = now + (index * 0.08);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, noteTime);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.02, noteTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  } catch (e) {}
}
