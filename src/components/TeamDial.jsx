import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TeamMember, { Avatar } from './TeamMember';

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
 * Rotary-dial team directory.
 * Hover / focus previews a member; click / tap / Enter rotates the dial so the
 * member comes to the 12 o'clock "finger stop" and locks the profile panel.
 */
export default function TeamDial({ dial, members, maxSize = 540, large = false }) {
  const wrapRef = useRef(null);
  const buttonRefs = useRef([]);
  const width = useWidth(wrapRef);

  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState(null);
  const [rotation, setRotation] = useState(0);

  const n = members.length;
  const step = 360 / n;
  const size = Math.max(260, Math.min(maxSize, width || 0));
  const compact = size < 440;
  const avatar = large ? (compact ? 64 : 84) : compact ? 48 : 64;
  const pad = compact ? 18 : 30;
  const radius = size / 2 - avatar / 2 - pad;
  const c = size / 2;

  const shown = members[preview ?? selected];

  const select = (i) => {
    setSelected(i);
    setPreview(null);
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
  const tickR = radius - avatar / 2 - 12;

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
      <div ref={wrapRef} className="w-full">
        <div className={`relative mx-auto ${width ? '' : 'invisible'}`} style={{ width: size, height: size }}>
          {/* Finger stop — fixed marker at 12 o'clock */}
          <span
            className="absolute left-1/2 top-0 h-3 w-1 -translate-x-1/2 rounded-full bg-accent"
            style={{ top: Math.max(2, pad / 2 - 6) }}
            aria-hidden
          />

          {/* Hub */}
          <div
            className="absolute grid place-items-center rounded-full border border-line-soft bg-surface/60 text-center"
            style={{ width: tickR * 2 - 28, height: tickR * 2 - 28, left: c - tickR + 14, top: c - tickR + 14 }}
            aria-hidden
          >
            <div>
              <p className="font-display text-[clamp(2.4rem,7vw,3.6rem)] leading-none text-ink">{dial.index}</p>
              <p className="label mt-2 text-muted">{dial.title}</p>
              <p className="label mt-1 text-[0.62rem] text-muted/80">{n} members</p>
            </div>
          </div>

          {/* Rotating ring */}
          <motion.div className="absolute inset-0" animate={{ rotate: rotation }} transition={dialSpring}>
            <svg className="absolute inset-0" width={size} height={size} aria-hidden>
              <circle cx={c} cy={c} r={radius} fill="none" stroke="var(--color-line)" strokeWidth="1" />
              {ticks.map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const len = deg % 30 === 0 ? 7 : 3.5;
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
              const isSelected = i === selected;
              const isShown = shown.id === m.id;
              return (
                <div
                  key={m.id}
                  className="absolute"
                  style={{ left: x - avatar / 2, top: y - avatar / 2, width: avatar, height: avatar }}
                >
                  <motion.div animate={{ rotate: -rotation }} transition={dialSpring} className="relative size-full">
                    <motion.button
                      ref={(el) => (buttonRefs.current[i] = el)}
                      type="button"
                      onClick={() => select(i)}
                      // Only preview on real mouse movement, so a member rotating
                      // under a still cursor doesn't steal the selection.
                      onPointerMove={(e) => e.pointerType === 'mouse' && preview !== i && setPreview(i)}
                      onPointerLeave={() => setPreview(null)}
                      onFocus={(e) => e.target.matches(':focus-visible') && setPreview(i)}
                      onBlur={() => setPreview(null)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      aria-label={`${m.name}, ${m.role}`}
                      aria-pressed={isSelected}
                      className={`relative block size-full rounded-full border bg-surface transition-[border-color,box-shadow,background-color] duration-300 ${
                        isShown
                          ? 'border-accent bg-accent-soft shadow-lift ring-4 ring-accent/25'
                          : 'border-line shadow-soft hover:border-accent'
                      }`}
                      animate={{ scale: isShown ? 1.14 : 1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    >
                      <Avatar member={m} className="text-ink" textClassName={large ? 'text-lg' : 'text-sm'} />
                    </motion.button>
                    {!compact && (
                      <span
                        className={`label pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] transition-colors ${
                          isShown ? 'text-accent-ink' : 'text-muted'
                        }`}
                        aria-hidden
                      >
                        {m.domain}
                      </span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <TeamMember member={shown} dialTitle={`Dial ${dial.index} — ${dial.title}`} />
    </div>
  );
}
