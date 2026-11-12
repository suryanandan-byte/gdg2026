import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useMark, MARK_COLORS, MARK_LETTERS, markSpring } from './MarkContext';

const circleSize = 'size-[clamp(78px,17vw,150px)]';

function Circle({ index, color, letter, intro, mx, my }) {
  const depth = 5 + index * 3;
  const dx = useTransform(mx, (v) => v * depth);
  const dy = useTransform(my, (v) => v * depth * 0.6);

  // Start clustered toward the middle circle (x in % of own width).
  const clusterX = `${(1 - index) * 74}%`;

  // Phase 1 (drop in, clustered) and phase 2 (spring apart) are declared
  // together with per-property timing, so the split always completes.
  const introTransition = {
    default: { type: 'spring', stiffness: 260, damping: 17, delay: 0.15 + index * 0.07 },
    x: { type: 'spring', stiffness: 140, damping: 10.5, mass: 0.85, delay: 0.7 },
  };

  return (
    <motion.div
      layoutId={`gdg-mark-${index}`}
      transition={markSpring}
      className={`relative ${circleSize}`}
      style={{ borderRadius: 999, zIndex: index === 1 ? 2 : 1 }}
    >
      <motion.div style={{ x: dx, y: dy }} className="size-full">
        <motion.div
          className="grid size-full place-items-center"
          style={{ backgroundColor: color, borderRadius: 999 }}
          initial={intro ? { opacity: 0, scale: 0.35, y: -36, x: clusterX } : false}
          animate={{ opacity: 1, scale: 1, y: 0, x: '0%' }}
          transition={introTransition}
        >
          <motion.span
            className="select-none font-display text-[clamp(2.3rem,7.6vw,4.6rem)] leading-none text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: intro ? 0.35 + index * 0.07 : 0.3, duration: 0.3 }}
          >
            {letter}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * The G·D·G signature mark.
 * - First load: circles drop in clustered, then spring apart like balls.
 * - Scrolling past the hero: the circles fly up into the navbar dots,
 *   and fly back when you return (shared layoutIds with the navbar).
 */
export default function GDGLogoAnimation({ onSettled }) {
  const { heroActive, setHeroActive } = useMark();
  const reduce = useReducedMotion();
  const [intro, setIntro] = useState(() => !reduce && window.scrollY < 40);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(
      () => {
        setIntro(false);
        onSettled?.();
      },
      intro ? 1500 : 200,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hand the mark to the navbar once the hero circles scroll out of view.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setHeroActive(entry.isIntersecting), {
      rootMargin: '-64px 0px 0px 0px',
      threshold: 0.4,
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setHeroActive]);

  // Gentle cursor drift — the site's one bit of continuous motion.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div ref={ref} className="flex items-center gap-[clamp(10px,2.4vw,22px)]" aria-hidden>
      {MARK_COLORS.map((color, i) =>
        heroActive ? (
          <Circle key={i} index={i} color={color} letter={MARK_LETTERS[i]} intro={intro} mx={mx} my={my} />
        ) : (
          <div key={i} className={circleSize} />
        ),
      )}
    </div>
  );
}
