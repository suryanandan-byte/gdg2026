import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import EventCover from './EventCover';
import { formatDate, statusOf, typeLabel } from '../data/events';

export function RegisterButton({ event, className = '' }) {
  if (statusOf(event) !== 'upcoming') return null;
  if (!event.registrationUrl) {
    return (
      <span
        className={`inline-flex cursor-not-allowed items-center rounded-full border border-line px-4 py-2 text-sm text-muted ${className}`}
        title="Registration link will be published soon"
      >
        Registration soon
      </span>
    );
  }
  return (
    <a
      href={event.registrationUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent-ink ${className}`}
    >
      Register <ArrowUpRight size={15} />
    </a>
  );
}

const EventCard = forwardRef(function EventCard({ event, onOpen }, ref) {
  const upcoming = statusOf(event) === 'upcoming';
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group flex w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-surface p-2.5 shadow-soft sm:w-auto transition-shadow duration-300 hover:shadow-lift"
    >
      <button type="button" onClick={() => onOpen(event)} className="block text-left" aria-hidden tabIndex={-1}>
        <EventCover event={event} className="aspect-[16/7]" />
      </button>

      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time dateTime={event.date} className="label text-accent-ink">
            {formatDate(event.date)}
          </time>
          <span className="label text-muted">{typeLabel[event.type]}</span>
          {event.isSample && (
            <span className="label rounded-full border border-dashed border-line px-2 py-0.5 text-[0.6rem] text-muted">Sample</span>
          )}
        </div>

        <h3 className="mt-2 font-display text-lg leading-snug text-ink">{event.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} aria-hidden /> {event.venue}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{event.summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => onOpen(event)}
            className="inline-flex items-center rounded-full border border-ink px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            View details
          </button>
          {upcoming && <RegisterButton event={event} />}
        </div>
      </div>
    </motion.article>
  );
});

export default EventCard;
