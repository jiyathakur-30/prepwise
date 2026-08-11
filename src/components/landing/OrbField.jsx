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
        highlight: lighten(baseRgb, 90),
        mid: baseRgb,
        dark: darken(baseRgb, 70),
        veryDark: darken(baseRgb, 130),
        edge: { r: 4, g: 5, b: 10 },
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
          { x: 0.7, y: 0.3, r: 110, phase: 0, floatAmp: 18, floatSpeed: 0.00035, parallax: 0.15, opacity: 1 },
          { x: 0.25, y: 0.65, r: 75, phase: 2.5, floatAmp: 12, floatSpeed: 0.00045, parallax: 0.08, opacity: 0.75 },
        ];
      } else {
        orbs = [
          { x: 0.68, y: 0.4, r: 200, phase: 0, floatAmp: 28, floatSpeed: 0.0003, parallax: 0.25, opacity: 1 },
          { x: 0.28, y: 0.58, r: 135, phase: 2.1, floatAmp: 22, floatSpeed: 0.00038, parallax: 0.15, opacity: 0.85 },
          { x: 0.82, y: 0.72, r: 85, phase: 4.3, floatAmp: 14, floatSpeed: 0.0005, parallax: 0.18, opacity: 0.65 },
          { x: 0.12, y: 0.22, r: 60, phase: 1.2, floatAmp: 10, floatSpeed: 0.0006, parallax: 0.1, opacity: 0.5 },
        ];
      }
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

      const breathe = 1 + Math.sin(time * 0.0008 + orb.phase) * 0.045;
      const r = Math.max(10, baseR * breathe);
      const stretchX = 1 + Math.sin(time * 0.0006 + orb.phase) * 0.06;
      const stretchY = 1 - Math.sin(time * 0.0006 + orb.phase) * 0.06;
      const op = orb.opacity;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(stretchX, stretchY);

      // Outer atmospheric glow
      const glowR = r * 2.8;
      const glow = ctx.createRadialGradient(0, 0, r * 0.7, 0, 0, glowR);
      glow.addColorStop(0, rgba(c.base, 0.18 * op));
      glow.addColorStop(0.4, rgba(c.base, 0.06 * op));
      glow.addColorStop(1, rgba(c.base, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Main sphere body — directional light from upper-left
      const lightX = -r * 0.32;
      const lightY = -r * 0.36;
      const body = ctx.createRadialGradient(lightX, lightY, r * 0.05, 0, 0, r * 1.25);
      body.addColorStop(0, rgba(c.highlight, 0.95 * op));
      body.addColorStop(0.12, rgba(c.mid, 0.88 * op));
      body.addColorStop(0.45, rgba(c.dark, 0.92 * op));
      body.addColorStop(0.8, rgba(c.veryDark, 0.95 * op));
      body.addColorStop(1, rgba(c.edge, op));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight — small bright spot
      const specX = -r * 0.38;
      const specY = -r * 0.4;
      const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, r * 0.38);
      spec.addColorStop(0, `rgba(255, 245, 255, ${0.55 * op})`);
      spec.addColorStop(0.35, `rgba(240, 230, 255, ${0.18 * op})`);
      spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // Rim light on lower-right edge (translucency feel)
      const rim = ctx.createRadialGradient(r * 0.45, r * 0.5, r * 0.65, r * 0.2, r * 0.25, r * 1.05);
      rim.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rim.addColorStop(0.82, 'rgba(0, 0, 0, 0)');
      rim.addColorStop(1, rgba(c.base, 0.12 * op));
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // Deep shadow on lower-right interior
      const shadow = ctx.createRadialGradient(r * 0.3, r * 0.35, 0, r * 0.1, r * 0.15, r * 0.9);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(0.6, 'rgba(0, 0, 0, 0)');
      shadow.addColorStop(1, `rgba(0, 0, 0, ${0.35 * op})`);
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function render(time) {
      if (!startRef.current) startRef.current = time;
      const t = time - startRef.current;

      pointer.current.x += (targetPointer.current.x - pointer.current.x) * 0.04;
      pointer.current.y += (targetPointer.current.y - pointer.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      for (const orb of orbs) {
        const fy = Math.sin(t * orb.floatSpeed + orb.phase) * orb.floatAmp;
        const fx = Math.cos(t * orb.floatSpeed * 0.7 + orb.phase) * orb.floatAmp * 0.5;
        const px = (pointer.current.x - 0.5) * 70 * orb.parallax;
        const py = (pointer.current.y - 0.5) * 45 * orb.parallax;
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
