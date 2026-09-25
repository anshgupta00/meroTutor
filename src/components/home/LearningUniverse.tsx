"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  // Brand-text target (used during intro)
  brandTargetX: number;
  brandTargetY: number;
  isBrandParticle: boolean;
}

interface SubjectNode {
  x: number;
  y: number;
  label: string;
  hue: number;
  alpha: number;
  triggered: boolean;
  triggerCooldown: number;
}

interface APlusParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  state: "gather" | "hold" | "dissolve";
  opacity: number;
  size: number;
}

// ─── 5×7 pixel font (each char is 5 cols wide, 7 rows tall) ──────────────────
const PIXEL_FONT: Record<string, string[]> = {
  M: [
    "X   X",
    "XX XX",
    "X X X",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
  ],
  E: [
    "XXXXX",
    "X    ",
    "X    ",
    "XXXX ",
    "X    ",
    "X    ",
    "XXXXX",
  ],
  R: [
    "XXXX ",
    "X   X",
    "X   X",
    "XXXX ",
    "X X  ",
    "X  X ",
    "X   X",
  ],
  O: [
    " XXX ",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    " XXX ",
  ],
  " ": [
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ],
  T: [
    "XXXXX",
    "  X  ",
    "  X  ",
    "  X  ",
    "  X  ",
    "  X  ",
    "  X  ",
  ],
  U: [
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    " XXX ",
  ],
};

// ─── Build "MERO TUTOR" dot positions (normalised 0–1) ────────────────────────
function buildBrandPoints(): { x: number; y: number }[] {
  const text = "MERO TUTOR";
  const charW = 5; // columns per char
  const charH = 7; // rows per char
  const gap   = 1; // cols between chars
  const totalCols = text.length * (charW + gap) - gap;
  const totalRows = charH;

  const pts: { x: number; y: number }[] = [];
  for (let ci = 0; ci < text.length; ci++) {
    const ch = text[ci];
    const bitmap = PIXEL_FONT[ch] ?? PIXEL_FONT[" "];
    for (let r = 0; r < charH; r++) {
      const row = bitmap[r] ?? "     ";
      for (let c = 0; c < charW; c++) {
        if (row[c] === "X") {
          pts.push({
            x: (ci * (charW + gap) + c) / (totalCols - 1),
            y: r / (totalRows - 1),
          });
        }
      }
    }
  }
  return pts;
}

const BRAND_PTS = buildBrandPoints();

// ─── A+ raster shape ─────────────────────────────────────────────────────────
const APLUS_SHAPE = [
  "    XXXXX      X   ",
  "   XX   XX     X   ",
  "  XX     XX    X   ",
  "  XX     XX   XXXXX",
  "  XXXXXXXXX    X   ",
  "  XX     XX    X   ",
  "  XX     XX    X   ",
];
function buildAPlusPoints() {
  const pts: { x: number; y: number }[] = [];
  const rows = APLUS_SHAPE.length, cols = APLUS_SHAPE[0].length;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (APLUS_SHAPE[r][c] === "X") pts.push({ x: c / (cols - 1), y: r / (rows - 1) });
  return pts;
}
const APLUS_PTS = buildAPlusPoints();

// ─── Subject nodes ────────────────────────────────────────────────────────────
const SUBJECT_NODES_DEF: SubjectNode[] = [
  // Dense extreme-left column
  { x: 0.01, y: 0.12, label: "Algebra",     hue: 213, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.02, y: 0.32, label: "History",     hue: 32,  alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.01, y: 0.52, label: "Economics",   hue: 145, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.03, y: 0.70, label: "Literature",  hue: 320, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.02, y: 0.88, label: "Arts",        hue: 15,  alpha: 0, triggered: false, triggerCooldown: 0 },
  // Near-left column
  { x: 0.09, y: 0.08, label: "Mathematics", hue: 220, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.10, y: 0.26, label: "Statistics",  hue: 200, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.08, y: 0.44, label: "Biology",     hue: 155, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.11, y: 0.62, label: "Chemistry",   hue: 35,  alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.09, y: 0.80, label: "Geography",   hue: 195, alpha: 0, triggered: false, triggerCooldown: 0 },
  // Left-centre
  { x: 0.20, y: 0.16, label: "Physics",     hue: 190, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.25, y: 0.50, label: "Coding",      hue: 275, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.18, y: 0.78, label: "Music",       hue: 340, alpha: 0, triggered: false, triggerCooldown: 0 },
  // Centre
  { x: 0.40, y: 0.20, label: "Science",     hue: 168, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.48, y: 0.58, label: "Accountancy", hue: 38,  alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.36, y: 0.84, label: "Social",      hue: 55,  alpha: 0, triggered: false, triggerCooldown: 0 },
  // Right
  { x: 0.68, y: 0.14, label: "English",     hue: 250, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.78, y: 0.46, label: "Entrance",    hue: 310, alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.62, y: 0.76, label: "Computer",    hue: 145, alpha: 0, triggered: false, triggerCooldown: 0 },
  // Far right
  { x: 0.90, y: 0.26, label: "Nepali",      hue: 0,   alpha: 0, triggered: false, triggerCooldown: 0 },
  { x: 0.92, y: 0.68, label: "GK",          hue: 175, alpha: 0, triggered: false, triggerCooldown: 0 },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }

// ─── Component ────────────────────────────────────────────────────────────────
export default function LearningUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  const stateRef = useRef({
    particles:     [] as Particle[],
    nodes:         SUBJECT_NODES_DEF.map(n => ({ ...n })) as SubjectNode[],
    mouseX:        -1000,
    mouseY:        -1000,
    touchX:        -1000,
    touchY:        -1000,
    width:         0,
    height:        0,
    reducedMotion: false,

    // ── Brand intro state ──
    // Phases: idle → forming → holding → dissolving → done
    brandPhase:    "idle" as "idle" | "forming" | "holding" | "dissolving" | "done",
    brandTimer:    0,
    brandInteracted: false,    // user touched/moved while holding
    brandAutoTimer:  0,        // frames since holding started (17s auto-dissolve)
    BRAND_HOLD_MAX:  1020,     // 17s × 60fps

    // A+ effect
    aplusActive:   false,
    aplusParticles: [] as APlusParticle[],
    aplusPhase:    "idle" as "idle" | "gather" | "hold" | "dissolve",
    aplusTimer:    0,
    aplusNodeIndex: -1,
  });

  // ─── Init particles ──────────────────────────────────────────────────────
  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = w < 640;
    const count = isMobile ? 60 : w < 1024 ? 100 : 160;
    const s = stateRef.current;

    // We need at least BRAND_PTS.length particles
    const total = Math.max(count, BRAND_PTS.length + 20);

    s.particles = Array.from({ length: total }, (_, i) => {
      const x = rand(0, w);
      const y = rand(0, h);
      const baseOp = rand(0.18, 0.7);
      const isBrand = i < BRAND_PTS.length;

      // Compute brand target position (centred in canvas)
      const textW = w * 0.82;
      const textH = textW * (7 / 60); // aspect: 7 rows / ~60 cols
      const tx = isBrand ? w / 2 - textW / 2 + BRAND_PTS[i].x * textW : 0;
      const ty = isBrand ? h / 2 - textH / 2 + BRAND_PTS[i].y * textH : 0;

      return {
        x, y, baseX: x, baseY: y,
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        size: rand(1.4, 3.2),
        opacity: baseOp,
        baseOpacity: baseOp,
        hue: Math.random() < 0.15 ? 168 : 213,
        brandTargetX: tx,
        brandTargetY: ty,
        isBrandParticle: isBrand,
      };
    });
  }, []);

  // ─── Start brand intro ───────────────────────────────────────────────────
  const startBrandIntro = useCallback(() => {
    const s = stateRef.current;
    if (s.reducedMotion) { s.brandPhase = "done"; return; }
    s.brandPhase    = "forming";
    s.brandTimer    = 0;
    s.brandAutoTimer = 0;
    s.brandInteracted = false;
  }, []);

  // ─── Dissolve brand ──────────────────────────────────────────────────────
  const dissolveBrand = useCallback(() => {
    const s = stateRef.current;
    if (s.brandPhase !== "holding") return;
    s.brandPhase = "dissolving";
    s.brandTimer = 0;
  }, []);

  // ─── Trigger A+ ─────────────────────────────────────────────────────────
  const triggerAplus = useCallback((nodeIdx: number) => {
    const s = stateRef.current;
    if (s.aplusActive || s.brandPhase !== "done") return;

    const node = s.nodes[nodeIdx];
    const cx = node.x * s.width;
    const cy = node.y * s.height;
    const aW = Math.min(130, s.width * 0.28);
    const aH = aW * 0.5;

    s.aplusParticles = APLUS_PTS.map((pt, i) => {
      const p = s.particles[i % s.particles.length];
      return {
        x: p.x, y: p.y,
        originX: p.x, originY: p.y,
        targetX: cx - aW / 2 + pt.x * aW,
        targetY: cy - aH / 2 + pt.y * aH,
        state:   "gather" as const,
        opacity: 0,
        size:    2.2,
      };
    });

    s.aplusActive    = true;
    s.aplusPhase     = "gather";
    s.aplusTimer     = 0;
    s.aplusNodeIndex = nodeIdx;
    node.triggerCooldown = 240;
  }, []);

  // ─── Main draw loop ──────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // roundRect polyfill
    if (!ctx.roundRect) {
      ctx.roundRect = function(x: number, y: number, w: number, h: number, r: number) {
        const R = Math.min(r, Math.min(w, h) / 2);
        this.moveTo(x + R, y); this.lineTo(x + w - R, y);
        this.quadraticCurveTo(x + w, y, x + w, y + R);
        this.lineTo(x + w, y + h - R);
        this.quadraticCurveTo(x + w, y + h, x + w - R, y + h);
        this.lineTo(x + R, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - R);
        this.lineTo(x, y + R);
        this.quadraticCurveTo(x, y, x + R, y);
        this.closePath();
      };
    }

    const s = stateRef.current;
    const { width: W, height: H, particles, nodes } = s;
    const isBrandActive = s.brandPhase === "forming" || s.brandPhase === "holding" || s.brandPhase === "dissolving";

    const cursorX = s.mouseX >= 0 ? s.mouseX : s.touchX;
    const cursorY = s.mouseY >= 0 ? s.mouseY : s.touchY;
    const hasCursor = cursorX > -900;

    // Detect interaction during brand hold → dissolve
    if (hasCursor && s.brandPhase === "holding") {
      dissolveBrand();
    }

    ctx.clearRect(0, 0, W, H);

    // ── Brand intro durations ──
    const FORM_DUR    = 90;   // 1.5s — particles gather into text
    const DISSOLVE_DUR = 60;  // 1.0s — particles scatter back

    // ─────────────────────────────────────────────────────────────────────
    //  BRAND PHASE — particles form "MERO TUTOR" in the centre
    // ─────────────────────────────────────────────────────────────────────
    if (isBrandActive) {
      s.brandTimer++;

      if (s.brandPhase === "forming" && s.brandTimer >= FORM_DUR) {
        s.brandPhase    = "holding";
        s.brandTimer    = 0;
        s.brandAutoTimer = 0;
      }
      if (s.brandPhase === "holding") {
        s.brandAutoTimer++;
        if (s.brandAutoTimer >= s.BRAND_HOLD_MAX) dissolveBrand();
      }
      if (s.brandPhase === "dissolving" && s.brandTimer >= DISSOLVE_DUR) {
        s.brandPhase = "done";
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isBrandParticle) {
          // ── Animate brand particle ──────────────────────────────────────
          if (s.brandPhase === "forming") {
            const t = easeOut(Math.min(s.brandTimer / FORM_DUR, 1));
            p.x = lerp(p.baseX, p.brandTargetX, t);
            p.y = lerp(p.baseY, p.brandTargetY, t);
            p.opacity = lerp(p.opacity, 0.9, 0.06);
          } else if (s.brandPhase === "holding") {
            // Gentle pulse
            const pulse = 0.85 + 0.1 * Math.sin(s.brandAutoTimer * 0.04 + i * 0.5);
            p.x = lerp(p.x, p.brandTargetX, 0.12);
            p.y = lerp(p.y, p.brandTargetY, 0.12);
            p.opacity = lerp(p.opacity, pulse, 0.06);
          } else if (s.brandPhase === "dissolving") {
            const t = easeInOut(Math.min(s.brandTimer / DISSOLVE_DUR, 1));
            p.x = lerp(p.brandTargetX, p.baseX, t);
            p.y = lerp(p.brandTargetY, p.baseY, t);
            p.opacity = lerp(0.9, p.baseOpacity, t);
          }

          // Draw bright brand particle
          const hue = 213;
          const bright = s.brandPhase === "holding" ? 68 : 58;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 82%, ${bright}%, ${p.opacity})`;
          ctx.fill();
          // Inner glow dot
          const gd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gd.addColorStop(0, `hsla(${hue}, 90%, 80%, ${p.opacity * 0.55})`);
          gd.addColorStop(1, "transparent");
          ctx.fillStyle = gd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ── Non-brand particles drift quietly in background ──
          if (!s.reducedMotion) {
            p.baseX += p.vx * 0.4; // slower during brand phase
            p.baseY += p.vy * 0.4;
            if (p.baseX < -10) p.baseX = W + 10;
            if (p.baseX > W + 10) p.baseX = -10;
            if (p.baseY < -10) p.baseY = H + 10;
            if (p.baseY > H + 10) p.baseY = -10;
            p.x = lerp(p.x, p.baseX, 0.05);
            p.y = lerp(p.y, p.baseY, 0.05);
          }
          p.opacity = lerp(p.opacity, p.baseOpacity * 0.4, 0.04); // dim in background

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 60%, 60%, ${p.opacity})`;
          ctx.fill();
        }
      }

      // Thin connections between brand particles only (during forming & holding)
      if (s.brandPhase !== "dissolving") {
        const brandPs = particles.filter(p => p.isBrandParticle && p.opacity > 0.3);
        for (let i = 0; i < brandPs.length; i++) {
          for (let j = i + 1; j < brandPs.length; j++) {
            const d = Math.hypot(brandPs[i].x - brandPs[j].x, brandPs[i].y - brandPs[j].y);
            if (d < 18) {
              const a = (1 - d / 18) * 0.25 * Math.min(brandPs[i].opacity, brandPs[j].opacity);
              ctx.beginPath();
              ctx.moveTo(brandPs[i].x, brandPs[i].y);
              ctx.lineTo(brandPs[j].x, brandPs[j].y);
              ctx.strokeStyle = `rgba(37,99,235,${a})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // "Touch to explore" label during hold
      if (s.brandPhase === "holding") {
        const textY = H / 2 + (W * 0.82 * (7 / 60)) / 2 + 26;
        const labelAlpha = Math.min(s.brandAutoTimer / 60, 1) *
          (s.brandAutoTimer > s.BRAND_HOLD_MAX - 60
            ? (s.BRAND_HOLD_MAX - s.brandAutoTimer) / 60
            : 1);
        ctx.save();
        ctx.globalAlpha = labelAlpha * 0.7;
        ctx.font = "500 11px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#64748b";
        ctx.textAlign = "center";
        ctx.fillText("Move your cursor to explore →", W / 2, textY);
        ctx.textAlign = "left";
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
      return; // Skip normal drawing while brand is active
    }

    // ─────────────────────────────────────────────────────────────────────
    //  NORMAL PARTICLE NETWORK (after brand dissolves)
    // ─────────────────────────────────────────────────────────────────────

    // Update & draw particles
    for (const p of particles) {
      if (!s.reducedMotion) {
        p.baseX += p.vx;
        p.baseY += p.vy;
        if (p.baseX < -10) p.baseX = W + 10;
        if (p.baseX > W + 10) p.baseX = -10;
        if (p.baseY < -10) p.baseY = H + 10;
        if (p.baseY > H + 10) p.baseY = -10;

        let fx = 0, fy = 0;
        if (hasCursor) {
          const dx = p.baseX - cursorX, dy = p.baseY - cursorY;
          const dist = Math.sqrt(dx*dx + dy*dy), R = 90;
          if (dist < R && dist > 0) {
            const force = ((R - dist) / R) * 1.8;
            fx = (dx / dist) * force;
            fy = (dy / dist) * force;
          }
        }
        p.x = lerp(p.x, p.baseX + fx * 14, 0.08);
        p.y = lerp(p.y, p.baseY + fy * 14, 0.08);
      } else {
        p.x = p.baseX; p.y = p.baseY;
      }

      let targetOp = p.baseOpacity;
      if (hasCursor) {
        const dd = Math.hypot(p.x - cursorX, p.y - cursorY);
        if (dd < 80) targetOp = Math.min(1, p.baseOpacity + (1 - dd / 80) * 0.5);
      }
      p.opacity = lerp(p.opacity, targetOp, 0.06);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 75%, 58%, ${p.opacity})`;
      ctx.fill();
    }

    // Connections
    const maxConn = 3, connDist = 110, cursorConnDist = 140;
    for (let i = 0; i < particles.length; i++) {
      let drawn = 0;
      for (let j = i + 1; j < particles.length && drawn < maxConn; j++) {
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < connDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37,99,235,${(1-d/connDist)*0.18*Math.min(particles[i].opacity,particles[j].opacity)*2})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
          drawn++;
        }
      }
    }

    // Cursor glow + connections
    if (hasCursor) {
      const grd = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 60);
      grd.addColorStop(0, "rgba(37,99,235,0.12)");
      grd.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cursorX, cursorY, 60, 0, Math.PI * 2); ctx.fill();

      for (const p of particles) {
        const dd = Math.hypot(p.x - cursorX, p.y - cursorY);
        if (dd < cursorConnDist) {
          ctx.beginPath();
          ctx.moveTo(cursorX, cursorY); ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(37,99,235,${(1-dd/cursorConnDist)*0.22})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      }
    }

    // Subject nodes
    for (let ni = 0; ni < nodes.length; ni++) {
      const node = nodes[ni];
      const nx = node.x * W, ny = node.y * H;
      const proximity = hasCursor ? 1 - Math.min(1, Math.hypot(cursorX-nx, cursorY-ny) / 120) : 0;
      node.alpha = lerp(node.alpha, proximity * 0.95 + 0.05, 0.10);
      if (node.triggerCooldown > 0) node.triggerCooldown--;

      if (proximity > 0.5 && !s.aplusActive && node.triggerCooldown === 0 && !s.reducedMotion)
        triggerAplus(ni);

      if (node.alpha < 0.02) continue;

      const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, 28);
      grd.addColorStop(0, `hsla(${node.hue},80%,62%,${node.alpha*0.55})`);
      grd.addColorStop(1, `hsla(${node.hue},80%,62%,0)`);
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(nx, ny, 28, 0, Math.PI * 2); ctx.fill();

      ctx.beginPath(); ctx.arc(nx, ny, 3.5 + proximity * 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${node.hue},80%,60%,${node.alpha})`; ctx.fill();

      if (node.alpha > 0.3) {
        for (const p of particles) {
          const pd = Math.hypot(p.x - nx, p.y - ny);
          if (pd < 80) {
            ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `hsla(${node.hue},80%,60%,${node.alpha*0.3*(1-pd/80)})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }

      if (node.alpha > 0.15) {
        ctx.save();
        ctx.globalAlpha = node.alpha;
        ctx.font = `500 ${11 + proximity * 2}px Inter, system-ui, sans-serif`;
        const tw = ctx.measureText(node.label).width;
        const bx = nx + 10, by = ny - 12, padX = 7, padY = 4;
        ctx.beginPath();
        ctx.roundRect(bx - padX, by - 12 - padY, tw + padX * 2, 16 + padY * 2, 6);
        ctx.fillStyle = `hsla(${node.hue},60%,96%,${node.alpha*0.92})`; ctx.fill();
        ctx.strokeStyle = `hsla(${node.hue},60%,75%,${node.alpha*0.4})`;
        ctx.lineWidth = 0.8; ctx.stroke();
        ctx.fillStyle = `hsl(${node.hue},50%,35%)`;
        ctx.fillText(node.label, bx, by - 2);
        ctx.restore();
      }
    }

    // A+ effect (gather 45f, hold 65f, dissolve 38f)
    if (s.aplusActive) {
      s.aplusTimer++;
      const GatherDur = 45, HoldDur = 65, DissolveDur = 38;
      const nodeHue = SUBJECT_NODES_DEF[s.aplusNodeIndex]?.hue ?? 213;

      for (const ap of s.aplusParticles) {
        if (s.aplusPhase === "gather") {
          const t = easeOut(Math.min(s.aplusTimer / GatherDur, 1));
          ap.x = lerp(ap.originX, ap.targetX, t);
          ap.y = lerp(ap.originY, ap.targetY, t);
          ap.opacity = lerp(0, 0.95, t);
        } else if (s.aplusPhase === "hold") {
          ap.opacity = lerp(ap.opacity, 0.97, 0.14);
        } else if (s.aplusPhase === "dissolve") {
          const t = Math.min(s.aplusTimer / DissolveDur, 1);
          ap.x = lerp(ap.targetX, ap.originX, easeOut(t));
          ap.y = lerp(ap.targetY, ap.originY, easeOut(t));
          ap.opacity = lerp(0.97, 0, t);
        }

        if (ap.opacity > 0.01) {
          ctx.beginPath(); ctx.arc(ap.x, ap.y, ap.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${nodeHue},80%,58%,${ap.opacity})`; ctx.fill();
          const gd = ctx.createRadialGradient(ap.x, ap.y, 0, ap.x, ap.y, 8);
          gd.addColorStop(0, `hsla(${nodeHue},80%,74%,${ap.opacity*0.5})`);
          gd.addColorStop(1, "transparent");
          ctx.fillStyle = gd; ctx.beginPath(); ctx.arc(ap.x, ap.y, 8, 0, Math.PI * 2); ctx.fill();
        }
      }

      if (s.aplusPhase === "gather" && s.aplusTimer >= GatherDur) { s.aplusPhase = "hold";     s.aplusTimer = 0; }
      else if (s.aplusPhase === "hold" && s.aplusTimer >= HoldDur) { s.aplusPhase = "dissolve"; s.aplusTimer = 0; }
      else if (s.aplusPhase === "dissolve" && s.aplusTimer >= DissolveDur) { s.aplusActive = false; s.aplusPhase = "idle"; }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [triggerAplus, dissolveBrand]);

  // ─── Setup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    s.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      s.width  = rect.width;
      s.height = rect.height;
      initParticles(rect.width, rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // Start brand intro after short delay (let particles settle)
    const introTimeout = setTimeout(() => startBrandIntro(), 400);

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouseX = e.clientX - rect.left;
      s.mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { s.mouseX = -1000; s.mouseY = -1000; };

    // Touch
    const onTouchStart = () => { if (s.brandPhase === "holding") dissolveBrand(); };
    const onTouchMove  = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      s.touchX = e.touches[0].clientX - rect.left;
      s.touchY = e.touches[0].clientY - rect.top;
    };
    const onTouchEnd = () => { s.touchX = -1000; s.touchY = -1000; };

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: true });
    canvas.addEventListener("touchend",   onTouchEnd);

    // Pause when off-screen
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(rafRef.current);
      }
    });
    io.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      clearTimeout(introTimeout);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect(); io.disconnect();
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, [draw, initParticles, startBrandIntro, dissolveBrand]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
