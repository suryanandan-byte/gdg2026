import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Section, SectionIntro } from '../components/SectionHeading';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import { events, eventTypes, sortedEvents, statusOf } from '../data/events';

const statuses = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];

export default function Events() {
  const [status, setStatus] = useState('upcoming');
  const [type, setType] = useState('all');
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  const counts = useMemo(
    () => Object.fromEntries(statuses.map((s) => [s.id, events.filter((e) => statusOf(e) === s.id).length])),
    [],
  );

  const visible = useMemo(
    () =>
      sortedEvents(
        events.filter((e) => statusOf(e) === status && (type === 'all' || e.type === type)),
        status,
      ),
    [status, type],
  );

  return (
    <Section id="events" accent="red">
    <Container>
      <SectionIntro
        id="events-title"
        eyebrow="What’s on"
        title="Events"
        intro="Workshops, hackathons and talks — register for what’s next or look back at past sessions."
      />

      <div className="flex flex-col gap-3 border-y border-line py-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Event status" className="inline-flex w-fit rounded-full border border-line bg-surface p-1">
          {statuses.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={status === s.id}
              onClick={() => setStatus(s.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                status === s.id ? 'text-paper' : 'text-muted hover:text-ink'
              }`}
            >
              {status === s.id && (
                <motion.span
                  layoutId="status-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {s.label} <span className="label opacity-70">{counts[s.id]}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" aria-label="Event type">
          {eventTypes.map((t) => (
            <button
              key={t.id}
              aria-pressed={type === t.id}
              onClick={() => setType(t.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                type === t.id ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line text-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} onOpen={setOpen} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {visible.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dashed border-line px-6 py-10 text-center text-muted"
          >
            No {status} events in this category yet — check back soon.
          </motion.p>
        )}
      </AnimatePresence>

      <EventModal event={open} onClose={close} />
    </Container>
    </Section>
  );
}
