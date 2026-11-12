import { motion } from 'framer-motion';
import { typeLabel } from '../data/events';

/** Flat tints per event type, used when no real banner is supplied. */
const coverTheme = {
  workshop: { bg: '#E4ECFB', shape: '#4285F4' },
  hackathon: { bg: '#FBE6E2', shape: '#EA4335' },
  talk: { bg: '#E0F1E4', shape: '#34A853' },
};

/**
 * Event banner. Renders the real image when `event.cover` is set,
 * otherwise a quiet geometric placeholder labelled with the event type.
 * Shares a layoutId with the modal banner so it expands smoothly.
 */
export default function EventCover({ event, className = '', layout = true, rounded = 'rounded-xl' }) {
  const theme = coverTheme[event.type] ?? coverTheme.workshop;
  return (
    <motion.div
      layoutId={layout ? `event-cover-${event.id}` : undefined}
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ backgroundColor: theme.bg, borderRadius: 14 }}
    >
      {event.cover ? (
        <img src={event.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
      ) : (
        <>
          <span
            className="absolute -right-[12%] -top-[30%] aspect-square w-[62%] rounded-full opacity-90"
            style={{ backgroundColor: theme.shape }}
            aria-hidden
          />
          <span
            className="absolute -bottom-[38%] right-[30%] aspect-square w-[34%] rounded-full border-2 opacity-50"
            style={{ borderColor: theme.shape }}
            aria-hidden
          />
          <span className="label absolute bottom-4 left-4 text-ink/70">{typeLabel[event.type]}</span>
          <span className="label absolute left-4 top-4 text-[0.6rem] text-ink/45">Banner placeholder</span>
        </>
      )}
    </motion.div>
  );
}
