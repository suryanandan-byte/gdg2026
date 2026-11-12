import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Tag, X, ImageIcon } from 'lucide-react';
import EventCover from './EventCover';
import { RegisterButton } from './EventCard';
import { formatDate, statusOf, typeLabel } from '../data/events';

function List({ title, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="label text-muted">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-ink-soft">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Masonry-style gallery. Shows placeholder tiles until photos are added. */
function Gallery({ images }) {
  const [lightbox, setLightbox] = useState(null);
  const tiles = images.length ? images : Array.from({ length: 6 }, () => null);
  const heights = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-square'];

  return (
    <div>
      <h4 className="label text-muted">Memories</h4>
      <div className="mt-3 columns-2 gap-3 sm:columns-3">
        {tiles.map((src, i) =>
          src ? (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(src)}
              className="mb-3 block w-full overflow-hidden rounded-lg"
              aria-label={`Open photo ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" className="w-full transition-transform duration-500 hover:scale-[1.03]" />
            </button>
          ) : (
            <div
              key={i}
              className={`mb-3 grid ${heights[i % heights.length]} w-full place-items-center rounded-lg border border-dashed border-line bg-paper text-muted`}
            >
              <ImageIcon size={18} aria-hidden />
            </div>
          ),
        )}
      </div>
      {!images.length && <p className="label mt-1 text-muted">Event photos will be added here</p>}

      <AnimatePresence>
        {lightbox && (
          <motion.button
            type="button"
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/80 p-6"
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close photo"
          >
            <motion.img
              src={lightbox}
              alt=""
              className="max-h-full max-w-full rounded-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventModal({ event, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!event) return;
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="presentation">
          <motion.div
            className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-lift sm:rounded-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-line bg-surface/90 backdrop-blur transition-colors hover:bg-paper"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <div className="p-3">
                <EventCover event={event} className="aspect-[16/7]" />
              </div>

              <div className="px-6 pb-8 pt-4 sm:px-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label rounded-full bg-accent-soft px-2.5 py-1 text-accent-ink">
                    {statusOf(event) === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                  {event.isSample && (
                    <span className="label rounded-full border border-dashed border-line px-2.5 py-1 text-muted">Sample data</span>
                  )}
                </div>
                <h2 id="event-modal-title" className="mt-4 text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-tight">
                  {event.title}
                </h2>

                <dl className="mt-6 grid gap-4 border-y border-line-soft py-5 sm:grid-cols-2">
                  {[
                    [CalendarDays, 'Date', formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
                    [Clock, 'Time', event.time],
                    [MapPin, 'Venue', event.venue],
                    [Tag, 'Category', typeLabel[event.type]],
                  ].map(([Icon, label, value]) => (
                    <div key={label} className="flex gap-3">
                      <Icon size={17} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden />
                      <div>
                        <dt className="label text-muted">{label}</dt>
                        <dd className="mt-1 text-ink">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">{event.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <List title="Good to know" items={event.info} />
                  <List title="Highlights" items={event.highlights} />
                  <List title="Key activities" items={event.activities} />
                  <List title="Outcomes" items={event.outcomes} />
                </div>

                {statusOf(event) === 'completed' && (
                  <div className="mt-10">
                    <Gallery images={event.gallery ?? []} />
                  </div>
                )}

                {statusOf(event) === 'upcoming' && (
                  <div className="mt-8 flex items-center gap-3">
                    <RegisterButton event={event} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
