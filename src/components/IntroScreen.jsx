import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   Cinematic Intro Screen
   • SVG tree grows via stroke-dashoffset animation
   • Progress bar fills in sync
   • Shows once per session (localStorage flag)
   • Respects prefers-reduced-motion
───────────────────────────────────────────────────────────────── */

const DURATION_MS = 4000; // total intro duration

function TreeSVG({ progress }) {
  // progress: 0 → 1
  // We reveal trunk 0–35%, branches 35–70%, leaves 70–100%
  const trunkProgress   = Math.min(1, progress / 0.35);
  const branchProgress  = Math.max(0, Math.min(1, (progress - 0.35) / 0.35));
  const leafProgress    = Math.max(0, Math.min(1, (progress - 0.70) / 0.30));

  // Stroke dash trick: totalLength * (1 - pct) = remaining offset
  const trunkLen   = 180;
  const branchLen  = 600;
  const leafLen    = 800;

  return (
    <svg
      viewBox="0 0 200 260"
      className="w-40 h-52 md:w-52 md:h-64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line
        x1="60" y1="248" x2="140" y2="248"
        stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* Trunk */}
      <path
        d="M100 248 C100 230 98 200 100 170"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={trunkLen}
        strokeDashoffset={trunkLen * (1 - trunkProgress)}
        style={{ transition: 'stroke-dashoffset 0.05s linear' }}
      />

      {/* Main branches */}
      <g
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={branchLen}
        strokeDashoffset={branchLen * (1 - branchProgress)}
        style={{ transition: 'stroke-dashoffset 0.05s linear' }}
      >
        <path d="M100 170 C95 150 70 140 55 125" />
        <path d="M100 170 C105 150 130 140 145 125" />
        <path d="M100 195 C90 175 68 168 55 158" />
        <path d="M100 195 C110 175 132 168 145 158" />
        <path d="M100 150 C100 135 100 120 100 108" />
      </g>

      {/* Leaf clusters */}
      <g
        fill="rgba(74,222,128,0.9)"
        style={{
          opacity: leafProgress,
          transform: `scale(${0.6 + leafProgress * 0.4})`,
          transformOrigin: '100px 120px',
          transition: 'opacity 0.05s linear, transform 0.05s ease',
        }}
      >
        {/* Top crown */}
        <ellipse cx="100" cy="95"  rx="30" ry="22" />
        {/* Left */}
        <ellipse cx="60"  cy="120" rx="22" ry="16" />
        {/* Right */}
        <ellipse cx="140" cy="120" rx="22" ry="16" />
        {/* Bottom left */}
        <ellipse cx="68"  cy="152" rx="18" ry="13" />
        {/* Bottom right */}
        <ellipse cx="132" cy="152" rx="18" ry="13" />
        {/* Center mid */}
        <ellipse cx="100" cy="130" rx="26" ry="19" />
      </g>
    </svg>
  );
}

export default function IntroScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);        // 0–1
  const [phase, setPhase]       = useState('grow');   // grow | final | out
  const [reduced, setReduced]   = useState(false);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReduced(true);
      // Skip directly
      setTimeout(() => onComplete(), 300);
      return;
    }

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const growEnd  = DURATION_MS * 0.72;
      const p        = Math.min(elapsed / growEnd, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Hold a beat, show final text, then exit
        setTimeout(() => {
          setPhase('final');
          setTimeout(() => {
            setPhase('out');
            setTimeout(onComplete, 700);
          }, 1100);
        }, 200);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // eslint-disable-line

  if (reduced) return null;

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, #1a3d22 0%, #0f2614 55%, #080f0a 100%)',
          }}
        >
          {/* Opening headline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="text-white/50 text-sm md:text-base tracking-widest uppercase font-outfit mb-10"
          >
            مبادرة أكسجين
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
            className="text-white text-3xl md:text-5xl font-bold font-cairo text-center mb-14 leading-snug"
          >
            حلم ممكن نحققه.
          </motion.h1>

          {/* Tree */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-14"
          >
            <TreeSVG progress={progress} />
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-green-400 rounded-full transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Final text */}
          <AnimatePresence>
            {phase === 'final' && (
              <motion.p
                key="final"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-white/70 text-base md:text-lg font-cairo text-center"
              >
                وإحنا نقدر نبدأ من هنا.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <button
            onClick={() => { setPhase('out'); setTimeout(onComplete, 700); }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 text-xs hover:text-white/50 transition-colors"
          >
            تخطي
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
