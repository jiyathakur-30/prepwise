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

export default function OrbField({ className = '' }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const targetPointer = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const startRef = useRef(null);
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

    function buildOrbs() {
      const isMobile = width < 768;
      if (isMobile) {
        orbs = [
          { x: 0.82, y: 0.25, r: 140, depth: 3, phase: 0, floatAmp: 20, floatSpeed: 0.00028, parallax: 0.18, opacity: 0.7 },
          { x: 0.12, y: 0.72, r: 85, depth: 2, phase: 2.4, floatAmp: 14, floatSpeed: 0.00038, parallax: 0.1, opacity: 0.4 },
        ];
      } else {
        orbs = [
          { x: 0.86, y: 0.28, r: 280, depth: 4, phase: 0, floatAmp: 30, floatSpeed: 0.00024, parallax: 0.28, opacity: 0.72 },
          { x: 0.14, y: 0.68, r: 190, depth: 3, phase: 2.2, floatAmp: 24, floatSpeed: 0.00032, parallax: 0.16, opacity: 0.5 },
          { x: 0.94, y: 0.85, r: 100, depth: 2, phase: 4.5, floatAmp: 14, floatSpeed: 0.00042, parallax: 0.1, opacity: 0.28 },
          { x: 0.04, y: 0.12, r: 60, depth: 1, phase: 1.3, floatAmp: 10, floatSpeed: 0.0005, parallax: 0.06, opacity: 0.2 },
        ];
      }
      orbs.sort((a, b) => a.depth - b.depth);
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

    function drawOrb(cx, cy, baseR, time, orb) {
      const c = colorsRef.current;
      if (!c) return;

      const breathe = 1 + Math.sin(time * 0.0006 + orb.phase) * 0.035;
      const r = Math.max(10, baseR * breathe);
      const stretchX = 1 + Math.sin(time * 0.0005 + orb.phase) * 0.06;
      const stretchY = 1 - Math.sin(time * 0.0005 + orb.phase) * 0.06;
      const op = orb.opacity;

      const lx = -0.34;
      const ly = -0.38;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(stretchX, stretchY);

      // 1 — Atmospheric glow (additive)
      ctx.globalCompositeOperation = 'lighter';
      const glowR = r * 3.2;
      const glow = ctx.createRadialGradient(0, 0, r * 0.75, 0, 0, glowR);
      glow.addColorStop(0, rgba(c.base, 0.1 * op));
      glow.addColorStop(0.35, rgba(c.base, 0.035 * op));
      glow.addColorStop(1, rgba(c.base, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 2 — Sphere body (directional light from upper-left)
      ctx.globalCompositeOperation = 'source-over';
      const bodyGrad = ctx.createRadialGradient(r * lx, r * ly, r * 0.02, 0, 0, r * 1.28);
      bodyGrad.addColorStop(0, rgba(c.highlight, 0.88 * op));
      bodyGrad.addColorStop(0.08, rgba(c.lightMid, 0.86 * op));
      bodyGrad.addColorStop(0.3, rgba(c.mid, 0.82 * op));
      bodyGrad.addColorStop(0.6, rgba(c.dark, 0.88 * op));
      bodyGrad.addColorStop(0.88, rgba(c.veryDark, 0.92 * op));
      bodyGrad.addColorStop(1, rgba(c.edge, op));
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 3 — Subsurface scatter
      ctx.globalCompositeOperation = 'lighter';
      const sss = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.55);
      sss.addColorStop(0, rgba(c.base, 0.12 * op));
      sss.addColorStop(1, rgba(c.base, 0));
      ctx.fillStyle = sss;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 4 — Specular highlight
      const specX = r * (lx + 0.04);
      const specY = r * (ly + 0.03);
      const specR = r * 0.28;
      const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
      spec.addColorStop(0, `rgba(255, 248, 255, ${0.6 * op})`);
      spec.addColorStop(0.25, `rgba(240, 230, 255, ${0.22 * op})`);
      spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 5 — Rim light
      const rimX = -r * lx * 0.45;
      const rimY = -r * ly * 0.45;
      const rim = ctx.createRadialGradient(rimX, rimY, r * 0.82, rimX, rimY, r * 1.03);
      rim.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rim.addColorStop(0.88, rgba(c.base, 0.04 * op));
      rim.addColorStop(1, rgba(c.base, 0.1 * op));
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // 6 — Core shadow
      ctx.globalCompositeOperation = 'source-over';
      const shadowX = -r * lx * 0.35;
      const shadowY = -r * ly * 0.35;
      const shadow = ctx.createRadialGradient(shadowX, shadowY, 0, shadowX, shadowY, r * 0.72);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(1, `rgba(4, 2, 14, ${0.38 * op})`);
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function render(time) {
      if (!startRef.current) startRef.current = time;
      const t = time - startRef.current;

      pointer.current.x += (targetPointer.current.x - pointer.current.x) * 0.03;
      pointer.current.y += (targetPointer.current.y - pointer.current.y) * 0.03;

      ctx.clearRect(0, 0, width, height);

      for (const orb of orbs) {
        const fy = Math.sin(t * orb.floatSpeed + orb.phase) * orb.floatAmp;
        const fx = Math.cos(t * orb.floatSpeed * 0.65 + orb.phase) * orb.floatAmp * 0.55;
        const px = (pointer.current.x - 0.5) * 60 * orb.parallax;
        const py = (pointer.current.y - 0.5) * 40 * orb.parallax;
        drawOrb(orb.x * width + fx + px, orb.y * height + fy + py, orb.r, t, orb);
      }

      if (!reduced) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    function renderStatic() {
      ctx.clearRect(0, 0, width, height);
      for (const orb of orbs) {
        drawOrb(orb.x * width, orb.y * height, orb.r, 0, orb);
      }
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      targetPointer.current.x = (e.clientX - rect.left) / rect.width;
      targetPointer.current.y = (e.clientY - rect.top) / rect.height;
    }

    function onResize() {
      resize();
      if (reduced) renderStatic();
    }

    resize();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    if (reduced) {
      renderStatic();
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
