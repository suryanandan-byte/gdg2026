import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar } from './TeamMember';

const dialSpring = { type: 'spring', stiffness: 70, damping: 16, mass: 1 };

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

/**
 * Rotary-dial ring of members.
 * Hover / keyboard focus previews a member; click / tap / Enter rotates the
 * dial so the member comes to the 12 o'clock "finger stop" and selects them.
 * The profile itself is rendered by the parent (shared between dials).
 */
export default function TeamDial({ dial, members, maxSize = 440, large = false, activeId, onPreview, onSelect }) {
  const wrapRef = useRef(null);
  const buttonRefs = useRef([]);
  const width = useWidth(wrapRef);
  const [rotation, setRotation] = useState(0);

  const n = members.length;
  const step = 360 / n;
  const size = Math.max(260, Math.min(maxSize, width || 0));
  const compact = size < 400;
  const avatar = large ? (compact ? 60 : 76) : compact ? 46 : 58;
  const pad = compact ? 16 : 26;
  const radius = size / 2 - avatar / 2 - pad;
  const c = size / 2;

  const select = (i) => {
    onSelect(members[i].id);
    const desired = -i * step;
    const diff = ((((desired - rotation) % 360) + 540) % 360) - 180;
    setRotation(rotation + diff);
  };

  const onKeyDown = (e, i) => {
    const next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (next) {
      e.preventDefault();
      buttonRefs.current[(i + next + n) % n]?.focus();
    }
  };

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const tickR = radius - avatar / 2 - 10;
  const hub = tickR * 2 - 24;

  return (
    <div ref={wrapRef} className="w-full">
      <div className={`relative mx-auto ${width ? '' : 'invisible'}`} style={{ width: size, height: size }}>
        {/* Finger stop — fixed marker at 12 o'clock */}
        <span className="absolute left-1/2 h-3 w-1 -translate-x-1/2 rounded-full bg-accent" style={{ top: Math.max(2, pad / 2 - 6) }} aria-hidden />

        {/* Hub */}
        <div
          className="absolute grid place-items-center rounded-full border border-line-soft bg-surface/60 text-center"
          style={{ width: hub, height: hub, left: c - hub / 2, top: c - hub / 2 }}
          aria-hidden
        >
          <div>
            <p className="font-display text-[clamp(1.8rem,5vw,2.6rem)] leading-none text-ink">{dial.index}</p>
            <p className="label mt-1.5 text-[0.62rem] text-muted">{dial.title}</p>
          </div>
        </div>

        {/* Rotating ring */}
        <motion.div className="absolute inset-0" animate={{ rotate: rotation }} transition={dialSpring}>
          <svg className="absolute inset-0" width={size} height={size} aria-hidden>
            <circle cx={c} cy={c} r={radius} fill="none" stroke="var(--color-line)" strokeWidth="1" />
            {ticks.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const len = deg % 30 === 0 ? 6 : 3;
              return (
                <line
                  key={deg}
                  x1={c + tickR * Math.sin(rad)}
                  y1={c - tickR * Math.cos(rad)}
                  x2={c + (tickR - len) * Math.sin(rad)}
                  y2={c - (tickR - len) * Math.cos(rad)}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {members.map((m, i) => {
            const angle = (i * step * Math.PI) / 180;
            const x = c + radius * Math.sin(angle);
            const y = c - radius * Math.cos(angle);
            const isShown = m.id === activeId;
            return (
              <div key={m.id} className="absolute" style={{ left: x - avatar / 2, top: y - avatar / 2, width: avatar, height: avatar }}>
                <motion.div animate={{ rotate: -rotation }} transition={dialSpring} className="relative size-full">
                  <motion.button
                    ref={(el) => (buttonRefs.current[i] = el)}
                    type="button"
                    onClick={() => select(i)}
                    // Only preview on real mouse movement, so a member rotating
                    // under a still cursor doesn't steal the selection.
                    onPointerMove={(e) => e.pointerType === 'mouse' && !isShown && onPreview(m.id)}
                    onPointerLeave={() => onPreview(null)}
                    onFocus={(e) => e.target.matches(':focus-visible') && onPreview(m.id)}
                    onBlur={() => onPreview(null)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    aria-label={`${m.name}, ${m.role}`}
                    aria-pressed={isShown}
                    className={`relative block size-full rounded-full border bg-surface transition-[border-color,box-shadow,background-color] duration-300 ${
                      isShown ? 'border-accent bg-accent-soft shadow-lift ring-4 ring-accent/25' : 'border-line shadow-soft hover:border-accent'
                    }`}
                    animate={{ scale: isShown ? 1.14 : 1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  >
                    <Avatar member={m} className="text-ink" textClassName={large ? 'text-base' : 'text-xs'} />
                  </motion.button>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
