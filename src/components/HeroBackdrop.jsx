import { motion } from 'framer-motion';
import { Rocket, Planet, Bulb, Satellite, Sparkle, Comet } from './Stickers';

/**
 * Orbit rings: three thin rings turning very slowly around the G·D·G mark,
 * each carrying one small "satellite" dot. Centred on `centerY` (px).
 */
const rings = [
  { size: 'clamp(300px, 46vw, 560px)', duration: 70, dir: 1, color: '#4285F4', style: 'solid', alpha: 0.12, dotAt: 30 },
  { size: 'clamp(460px, 72vw, 880px)', duration: 110, dir: -1, color: '#FBBC04', style: 'dashed', alpha: 0.1, dotAt: 200 },
  { size: 'clamp(640px, 100vw, 1220px)', duration: 160, dir: 1, color: '#34A853', style: 'solid', alpha: 0.07, dotAt: 120 },
];

function Orbits({ centerY, play }) {
  return (
    <div className="pointer-events-none absolute left-1/2" style={{ top: centerY }} aria-hidden>
      {rings.map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: r.size,
            height: r.size,
            left: 0,
            top: 0,
            x: '-50%',
            y: '-50%',
            border: `1px ${r.style} rgba(245, 241, 232, ${r.alpha})`,
            rotate: r.dotAt,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: play ? r.dotAt + 360 * r.dir : r.dotAt,
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.4 + i * 0.15 },
            scale: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.15 },
            rotate: { duration: r.duration, ease: 'linear', repeat: Infinity },
          }}
        >
          <span
            className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: r.color, boxShadow: `0 0 14px 2px ${r.color}66` }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Stickers placed around the edges, clear of the centred text.
 * `mobile: false` hides a sticker on small screens to keep things calm.
 */
const stickers = [
  { Art: Rocket, pos: { left: '7%', top: '20%' }, size: 'clamp(54px, 7vw, 92px)', tilt: -12, float: 7, mobile: true },
  { Art: Planet, pos: { right: '7%', top: '15%' }, size: 'clamp(58px, 7.5vw, 100px)', tilt: 10, float: 8, mobile: true },
  { Art: Bulb, pos: { left: '11%', bottom: '17%' }, size: 'clamp(50px, 6vw, 80px)', tilt: 8, float: 6, mobile: false },
  { Art: Satellite, pos: { right: '10%', bottom: '19%' }, size: 'clamp(56px, 7vw, 92px)', tilt: -6, float: 7, mobile: true },
  { Art: Comet, pos: { left: '4%', top: '50%' }, size: 'clamp(36px, 4vw, 56px)', tilt: 14, float: 5, mobile: false },
  { Art: () => <Sparkle color="#FBBC04" />, pos: { right: '25%', bottom: '9%' }, size: 'clamp(26px, 3vw, 40px)', tilt: 0, float: 4, mobile: false },
  { Art: () => <Sparkle color="#F5F1E8" />, pos: { right: '5%', top: '48%' }, size: 'clamp(18px, 2vw, 26px)', tilt: 0, float: 3, mobile: false },
];

function Stickers({ show, play }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      {stickers.map(({ Art, pos, size, tilt, float, mobile }, i) => (
        <motion.div
          key={i}
          className={`sticker absolute ${mobile ? '' : 'hidden md:block'}`}
          style={{ ...pos, width: size, height: size }}
          initial={{ opacity: 0, scale: 0.4, rotate: tilt - 25 }}
          animate={show ? { opacity: 1, scale: 1, rotate: tilt } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 + i * 0.08 }}
          drag
          dragSnapToOrigin
          dragElastic={0.6}
          whileHover={{ scale: 1.12, rotate: tilt + (tilt >= 0 ? 8 : -8) }}
          whileDrag={{ scale: 1.18, cursor: 'grabbing' }}
        >
          {/* Gentle float — separate layer so it doesn't fight drag/hover */}
          <motion.div
            className="size-full"
            animate={play ? { y: [0, -float, 0], rotate: [0, tilt >= 0 ? 3 : -3, 0] } : { y: 0 }}
            transition={{ duration: 5 + (i % 3) * 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <Art />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroBackdrop({ centerY, showStickers, play }) {
  return (
    <>
      <Orbits centerY={centerY} play={play} />
      <Stickers show={showStickers} play={play} />
    </>
  );
}
