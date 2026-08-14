import React, { useRef, useEffect } from 'react';

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim();
  if (h.length !== 6) return { r: 124, g: 92, b: 255 };
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lighten(c, amt) {
  return {
    r: clamp(c.r + amt, 0, 255),
    g: clamp(c.g + amt, 0, 255),
    b: clamp(c.b + amt, 0, 255),
  };
}

function darken(c, amt) {
  return {
    r: clamp(c.r - amt, 0, 255),
    g: clamp(c.g - amt, 0, 255),
    b: clamp(c.b - amt, 0, 255),
  };
}

function rgba(c, a) {
  return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${a})`;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export default function OrbField({ className = '' }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const targetPointer = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const lastTimeRef = useRef(null);
  const colorsRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      const primary = styles.getPropertyValue('--brand-primary').trim() || '#7C5CFF';
      const baseRgb = hexToRgb(primary);
      colorsRef.current = {
        base: baseRgb,
        highlight: lighten(baseRgb, 115),
        lightMid: lighten(baseRgb, 45),
        mid: baseRgb,
        dark: darken(baseRgb, 55),
        veryDark: darken(baseRgb, 115),
        edge: { r: 3, g: 2, b: 10 },
      };
    }

    readColors();

    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let orbs = [];
    let popGhosts = [];
    let burstRings = [];
    let burstParticles = [];
    let nextId = 1;

    // Slot configurations to maintain visual balance across the hero
    const desktopSlots = [
      { slot: 0, xRange: [0.76, 0.88], yRange: [0.22, 0.38], baseR: 285, depth: 4, opacity: 0.96, floatAmp: 28, floatSpeed: 0.00025, parallax: 0.30 },
      { slot: 1, xRange: [0.10, 0.20], yRange: [0.58, 0.72], baseR: 195, depth: 3, opacity: 0.78, floatAmp: 22, floatSpeed: 0.00032, parallax: 0.19 },
      { slot: 2, xRange: [0.84, 0.94], yRange: [0.74, 0.86], baseR: 120, depth: 2, opacity: 0.44, floatAmp: 16, floatSpeed: 0.00042, parallax: 0.12 },
      { slot: 3, xRange: [0.05, 0.14], yRange: [0.08, 0.20], baseR: 72,  depth: 1, opacity: 0.28, floatAmp: 10, floatSpeed: 0.00052, parallax: 0.07 },
      { slot: 4, xRange: [0.42, 0.58], yRange: [0.06, 0.14], baseR: 86,  depth: 2, opacity: 0.34, floatAmp: 12, floatSpeed: 0.00038, parallax: 0.10 },
      { slot: 5, xRange: [0.22, 0.34], yRange: [0.82, 0.92], baseR: 135, depth: 2, opacity: 0.48, floatAmp: 18, floatSpeed: 0.00030, parallax: 0.14 },
      { slot: 6, xRange: [0.66, 0.78], yRange: [0.66, 0.78], baseR: 82,  depth: 1, opacity: 0.30, floatAmp: 11, floatSpeed: 0.00048, parallax: 0.08 },
      { slot: 7, xRange: [0.82, 0.94], yRange: [0.06, 0.16], baseR: 62,  depth: 1, opacity: 0.25, floatAmp: 9,  floatSpeed: 0.00055, parallax: 0.06 },
    ];

    const tabletSlots = [
      { slot: 0, xRange: [0.74, 0.86], yRange: [0.20, 0.34], baseR: 210, depth: 4, opacity: 0.92, floatAmp: 24, floatSpeed: 0.00028, parallax: 0.26 },
      { slot: 1, xRange: [0.10, 0.20], yRange: [0.60, 0.74], baseR: 145, depth: 3, opacity: 0.75, floatAmp: 18, floatSpeed: 0.00035, parallax: 0.16 },
      { slot: 2, xRange: [0.82, 0.92], yRange: [0.76, 0.88], baseR: 92,  depth: 2, opacity: 0.40, floatAmp: 13, floatSpeed: 0.00045, parallax: 0.10 },
      { slot: 3, xRange: [0.06, 0.14], yRange: [0.08, 0.18], baseR: 58,  depth: 1, opacity: 0.28, floatAmp: 9,  floatSpeed: 0.00052, parallax: 0.06 },
      { slot: 4, xRange: [0.44, 0.56], yRange: [0.06, 0.14], baseR: 70,  depth: 2, opacity: 0.32, floatAmp: 11, floatSpeed: 0.00040, parallax: 0.09 },
      { slot: 5, xRange: [0.22, 0.34], yRange: [0.82, 0.92], baseR: 105, depth: 2, opacity: 0.45, floatAmp: 15, floatSpeed: 0.00032, parallax: 0.12 },
    ];

    const mobileSlots = [
      { slot: 0, xRange: [0.72, 0.86], yRange: [0.18, 0.28], baseR: 135, depth: 3, opacity: 0.88, floatAmp: 16, floatSpeed: 0.00030, parallax: 0.18 },
      { slot: 1, xRange: [0.10, 0.22], yRange: [0.64, 0.76], baseR: 90,  depth: 2, opacity: 0.60, floatAmp: 14, floatSpeed: 0.00038, parallax: 0.12 },
      { slot: 2, xRange: [0.80, 0.92], yRange: [0.80, 0.90], baseR: 52,  depth: 1, opacity: 0.32, floatAmp: 9,  floatSpeed: 0.00050, parallax: 0.06 },
      { slot: 3, xRange: [0.06, 0.16], yRange: [0.08, 0.18], baseR: 44,  depth: 1, opacity: 0.25, floatAmp: 8,  floatSpeed: 0.00056, parallax: 0.05 },
    ];

    function createOrbFromSlot(slotConfig, spawnImmediately = true) {
      const [minX, maxX] = slotConfig.xRange;
      const [minY, maxY] = slotConfig.yRange;
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);

      return {
        id: nextId++,
        slot: slotConfig.slot,
        x,
        y,
        baseR: slotConfig.baseR,
        depth: slotConfig.depth,
        phase: Math.random() * Math.PI * 2,
        floatAmp: slotConfig.floatAmp,
        floatSpeed: slotConfig.floatSpeed,
        hAmp: slotConfig.floatAmp * 0.45,
        hSpeed: slotConfig.floatSpeed * 0.65,
        parallax: slotConfig.parallax,
        targetOpacity: slotConfig.opacity,
        spawnProgress: spawnImmediately ? 1 : 0,
        spawnDuration: 550,
        spawnStartTime: spawnImmediately ? 0 : performance.now(),
        currentX: 0,
        currentY: 0,
        currentR: slotConfig.baseR,
      };
    }

    function buildOrbs() {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const slots = isMobile ? mobileSlots : isTablet ? tabletSlots : desktopSlots;

      nextId = 1;
      popGhosts = [];
      burstRings = [];
      burstParticles = [];

      orbs = slots.map((s) => createOrbFromSlot(s, true));
      orbs.sort((a, b) => a.depth - b.depth);
    }

    const depthProfiles = {
      4: { baseR: 275, opacity: 0.96, floatAmp: 28, floatSpeed: 0.00025, parallax: 0.30 },
      3: { baseR: 190, opacity: 0.78, floatAmp: 22, floatSpeed: 0.00032, parallax: 0.19 },
      2: { baseR: 125, opacity: 0.45, floatAmp: 16, floatSpeed: 0.00040, parallax: 0.12 },
      1: { baseR: 70,  opacity: 0.28, floatAmp: 10, floatSpeed: 0.00052, parallax: 0.07 },
    };

    function getValidSpawnPosition(poppedOrb, currentOrbs, isLargeOrb) {
      const oldX = poppedOrb.x;
      const oldY = poppedOrb.y;
      const minDistance = 0.35;
      const minLiveDistance = isLargeOrb ? 0.18 : 0.14;

      // Keep slightly away from extreme canvas edges and top navbar
      const minX = 0.05;
      const maxX = 0.95;
      const minY = 0.08;
      const maxY = 0.92;

      // Left-center hero text area to avoid direct heavy overlap
      const heroTextZone = { minX: 0.16, maxX: 0.52, minY: 0.26, maxY: 0.62 };

      let bestCandidate = null;
      let maxScore = -Infinity;

      for (let attempt = 0; attempt < 30; attempt++) {
        // Uniformly random coordinates across the valid hero area
        const candX = minX + Math.random() * (maxX - minX);
        const candY = minY + Math.random() * (maxY - minY);

        // 1. Check distance from popped orb
        const distFromOld = Math.hypot(candX - oldX, candY - oldY);

        // 2. Check distance from other live orbs
        let minLiveDist = Infinity;
        for (let i = 0; i < currentOrbs.length; i++) {
          const o = currentOrbs[i];
          if (o === poppedOrb) continue;
          const d = Math.hypot(candX - o.x, candY - o.y);
          if (d < minLiveDist) minLiveDist = d;
        }

        // 3. Avoid landing directly over hero text box
        const inHeroText =
          candX >= heroTextZone.minX &&
          candX <= heroTextZone.maxX &&
          candY >= heroTextZone.minY &&
          candY <= heroTextZone.maxY;

        // Is this candidate fully valid?
        const isFarFromOld = distFromOld >= minDistance;
        const isFarFromLive = minLiveDist >= minLiveDistance;
        const avoidsHero = !inHeroText || (!isLargeOrb && attempt > 15);

        if (isFarFromOld && isFarFromLive && avoidsHero) {
          // Perfect candidate found! Return immediately for pure randomness
          return { x: candX, y: candY };
        }

        // Calculate score for best fallback selection
        const score =
          Math.min(distFromOld, 0.5) * 1.8 +
          Math.min(minLiveDist, 0.35) * 2.2 +
          (inHeroText ? -0.8 : 0.3);

        if (score > maxScore) {
          maxScore = score;
          bestCandidate = { x: candX, y: candY };
        }
      }

      // If no candidate passed all constraints within 30 attempts, use the best scored candidate
      return (
        bestCandidate || {
          x: oldX > 0.5 ? 0.15 + Math.random() * 0.2 : 0.75 + Math.random() * 0.2,
          y: oldY > 0.5 ? 0.15 + Math.random() * 0.2 : 0.75 + Math.random() * 0.2,
        }
      );
    }

    function reinitializeOrb(orb, now) {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const scaleMult = isMobile ? 0.52 : isTablet ? 0.78 : 1.0;

      // Randomize depth across 1 to 4 with balanced weights
      const depthChoices = isMobile ? [1, 2, 2, 3] : [1, 1, 2, 2, 3, 4];
      const depth = depthChoices[Math.floor(Math.random() * depthChoices.length)];
      const profile = depthProfiles[depth] || depthProfiles[2];

      const isLarge = depth >= 3;
      const newPos = getValidSpawnPosition(orb, orbs, isLarge);

      const rVar = 0.88 + Math.random() * 0.24;
      const baseR = Math.round(profile.baseR * scaleMult * rVar);
      const floatAmp = Math.round(profile.floatAmp * (0.85 + Math.random() * 0.3));
      const floatSpeed = profile.floatSpeed * (0.85 + Math.random() * 0.3);

      orb.id = nextId++;
      orb.x = newPos.x;
      orb.y = newPos.y;
      orb.depth = depth;
      orb.baseR = baseR;
      orb.floatAmp = floatAmp;
      orb.floatSpeed = floatSpeed;
      orb.hAmp = floatAmp * (0.35 + Math.random() * 0.25);
      orb.hSpeed = floatSpeed * (0.55 + Math.random() * 0.25);
      orb.parallax = profile.parallax * (0.85 + Math.random() * 0.3);
      orb.phase = Math.random() * Math.PI * 2;
      orb.targetOpacity = profile.opacity;
      orb.spawnProgress = 0;
      orb.spawnStartTime = now;
      orb.spawnDuration = 550;
      orb.currentR = 0;

      orbs.sort((a, b) => a.depth - b.depth);
    }

    function popOrb(orb, now) {
      // 1. Ghost balloon that expands and fades at clicked point
      popGhosts.push({
        x: orb.currentX,
        y: orb.currentY,
        baseR: orb.currentR || orb.baseR,
        opacity: orb.targetOpacity || 0.8,
        phase: orb.phase,
        startTime: now,
        duration: 320,
      });

      // 2. Expanding shockwave ring
      const orbR = orb.currentR || orb.baseR;
      burstRings.push({
        x: orb.currentX,
        y: orb.currentY,
        r: orbR * 0.7,
        maxR: orbR * 1.45,
        alpha: 0.65,
        progress: 0,
        duration: 350,
      });

      // 3. 8–12 soft luminous purple particles
      const count = 9 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
        const speed = (orbR * 0.0035 + 0.7) * (0.75 + Math.random() * 0.7);
        burstParticles.push({
          x: orb.currentX + Math.cos(angle) * orbR * 0.35,
          y: orb.currentY + Math.sin(angle) * orbR * 0.35,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 2 + Math.random() * 3.5,
          alpha: 0.85 + Math.random() * 0.15,
          life: 1.0,
          decay: 0.0028 + Math.random() * 0.0016,
        });
      }

      // 4. In-place reset for automatic respawn (constant live orb count)
      reinitializeOrb(orb, now);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildOrbs();
    }

    function drawOrb(cx, cy, r, time, phase, op) {
      const c = colorsRef.current;
      if (!c || op <= 0.001 || r <= 2) return;

      const stretchX = 1 + Math.sin(time * 0.0005 + phase) * 0.06;
      const stretchY = 1 - Math.sin(time * 0.0005 + phase) * 0.06;

      const lx = -0.34;
      const ly = -0.38;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(stretchX, stretchY);

      // 1 — Atmospheric glow (additive)
      ctx.globalCompositeOperation = 'lighter';
      const glowR = r * 3.4;
      const glow = ctx.createRadialGradient(0, 0, r * 0.75, 0, 0, glowR);
      glow.addColorStop(0, rgba(c.base, 0.14 * op));
      glow.addColorStop(0.35, rgba(c.base, 0.05 * op));
      glow.addColorStop(1, rgba(c.base, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 2 — Sphere body (directional light from upper-left)
      ctx.globalCompositeOperation = 'source-over';
      const bodyGrad = ctx.createRadialGradient(r * lx, r * ly, r * 0.02, 0, 0, r * 1.28);
      bodyGrad.addColorStop(0, rgba(c.highlight, 0.92 * op));
      bodyGrad.addColorStop(0.08, rgba(c.lightMid, 0.9 * op));
      bodyGrad.addColorStop(0.3, rgba(c.mid, 0.86 * op));
      bodyGrad.addColorStop(0.6, rgba(c.dark, 0.92 * op));
      bodyGrad.addColorStop(0.88, rgba(c.veryDark, 0.96 * op));
      bodyGrad.addColorStop(1, rgba(c.edge, op));
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 3 — Subsurface scatter (inner glow, additive)
      ctx.globalCompositeOperation = 'lighter';
      const sss = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.55);
      sss.addColorStop(0, rgba(c.base, 0.16 * op));
      sss.addColorStop(1, rgba(c.base, 0));
      ctx.fillStyle = sss;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 4 — Specular highlight (bright, small, soft)
      const specX = r * (lx + 0.04);
      const specY = r * (ly + 0.03);
      const specR = r * 0.3;
      const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
      spec.addColorStop(0, `rgba(255, 248, 255, ${0.7 * op})`);
      spec.addColorStop(0.25, `rgba(240, 230, 255, ${0.28 * op})`);
      spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 5 — Rim light on shadow side (translucency)
      const rimX = -r * lx * 0.45;
      const rimY = -r * ly * 0.45;
      const rim = ctx.createRadialGradient(rimX, rimY, r * 0.82, rimX, rimY, r * 1.03);
      rim.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rim.addColorStop(0.88, rgba(c.base, 0.06 * op));
      rim.addColorStop(1, rgba(c.base, 0.14 * op));
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 6 — Core shadow deepening
      ctx.globalCompositeOperation = 'source-over';
      const shadowX = -r * lx * 0.35;
      const shadowY = -r * ly * 0.35;
      const shadow = ctx.createRadialGradient(shadowX, shadowY, 0, shadowX, shadowY, r * 0.72);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(1, `rgba(4, 2, 14, ${0.42 * op})`);
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function getHoveredOrb(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      // Check from topmost orb (highest depth) to bottommost
      for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        if (orb.spawnProgress < 0.25) continue;
        const dx = px - orb.currentX;
        const dy = py - orb.currentY;
        const dist = Math.hypot(dx, dy);
        if (dist <= orb.currentR * 1.05) {
          return orb;
        }
      }
      return null;
    }

    function render(time) {
      const now = performance.now();
      if (!startRef.current) startRef.current = time;
      const t = time - startRef.current;
      const dt = lastTimeRef.current ? Math.min(64, time - lastTimeRef.current) : 16;
      lastTimeRef.current = time;

      pointer.current.x += (targetPointer.current.x - pointer.current.x) * 0.035;
      pointer.current.y += (targetPointer.current.y - pointer.current.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw live orbs (including newly spawning replacement orbs)
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];

        if (orb.spawnProgress < 1) {
          orb.spawnProgress = clamp((now - orb.spawnStartTime) / orb.spawnDuration, 0, 1);
        }

        const scaleFactor = easeOutCubic(orb.spawnProgress);
        const op = orb.targetOpacity * easeOutQuad(orb.spawnProgress);

        const breathe = 1 + Math.sin(t * 0.0006 + orb.phase) * 0.038;
        const r = Math.max(4, orb.baseR * breathe * scaleFactor);

        const fy = Math.sin(t * orb.floatSpeed + orb.phase) * orb.floatAmp;
        const fx = Math.cos(t * orb.hSpeed + orb.phase) * orb.hAmp;
        const px = (pointer.current.x - 0.5) * 75 * orb.parallax;
        const py = (pointer.current.y - 0.5) * 45 * orb.parallax;

        orb.currentX = orb.x * width + fx + px;
        orb.currentY = orb.y * height + fy + py;
        orb.currentR = r;

        drawOrb(orb.currentX, orb.currentY, r, t, orb.phase, op);
      }

      // 2. Draw popping ghosts (expanding & fading balloon)
      for (let i = popGhosts.length - 1; i >= 0; i--) {
        const g = popGhosts[i];
        const prog = clamp((now - g.startTime) / g.duration, 0, 1);
        if (prog >= 1) {
          popGhosts.splice(i, 1);
          continue;
        }
        const scale = 1.0 + easeOutQuad(prog) * 0.35;
        const op = g.opacity * (1.0 - prog);
        const r = g.baseR * scale;
        drawOrb(g.x, g.y, r, t, g.phase, op);
      }

      // 3. Draw expanding shockwave rings
      for (let i = burstRings.length - 1; i >= 0; i--) {
        const ring = burstRings[i];
        ring.progress += dt / ring.duration;
        if (ring.progress >= 1) {
          burstRings.splice(i, 1);
          continue;
        }
        const curR = ring.r + (ring.maxR - ring.r) * easeOutQuad(ring.progress);
        const curAlpha = ring.alpha * (1 - ring.progress);
        const c = colorsRef.current;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = c ? rgba(c.highlight, curAlpha * 0.7) : `rgba(200, 175, 255, ${curAlpha * 0.7})`;
        ctx.lineWidth = Math.max(1, 2.5 * (1 - ring.progress));
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, curR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const p = burstParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay * (dt / 16);
        if (p.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }
        const curAlpha = p.alpha * p.life;
        const c = colorsRef.current;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        grad.addColorStop(0, `rgba(255, 245, 255, ${curAlpha * 0.95})`);
        grad.addColorStop(0.4, c ? rgba(c.lightMid, curAlpha * 0.6) : `rgba(160, 130, 255, ${curAlpha * 0.6})`);
        grad.addColorStop(1, 'rgba(124, 92, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!reduced) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    function renderStatic() {
      ctx.clearRect(0, 0, width, height);
      for (const orb of orbs) {
        orb.currentX = orb.x * width;
        orb.currentY = orb.y * height;
        orb.currentR = orb.baseR;
        drawOrb(orb.currentX, orb.currentY, orb.baseR, 0, orb.phase, orb.targetOpacity);
      }
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      targetPointer.current.x = (e.clientX - rect.left) / rect.width;
      targetPointer.current.y = (e.clientY - rect.top) / rect.height;

      const hovered = getHoveredOrb(e.clientX, e.clientY);
      canvas.style.cursor = hovered ? 'pointer' : 'default';
    }

    function onPointerDown(e) {
      const hitOrb = getHoveredOrb(e.clientX, e.clientY);
      if (hitOrb) {
        popOrb(hitOrb, performance.now());
        const hoveredAfter = getHoveredOrb(e.clientX, e.clientY);
        canvas.style.cursor = hoveredAfter ? 'pointer' : 'default';
        if (reduced) {
          renderStatic();
        }
      }
    }

    function onPointerLeave() {
      canvas.style.cursor = 'default';
    }

    function onResize() {
      resize();
      if (reduced) renderStatic();
    }

    resize();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerleave', onPointerLeave);

    if (reduced) {
      renderStatic();
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ touchAction: 'manipulation' }}
      aria-hidden="true"
    />
  );
}
