import { motion } from 'framer-motion';
import Reveal, { easeOut } from './Reveal';

const inView = { once: true, margin: '-80px' };

/** Word-by-word title reveal, triggered when it scrolls into view. */
export function WordReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');
  return (
    <motion.span className={className} aria-label={text} initial="hidden" whileInView="shown" viewport={inView}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
            transition={{ duration: 0.7, ease: easeOut, delay: delay + i * 0.07 }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Section wrapper: anchor target, per-section accent colour, consistent spacing. */
export function Section({ id, accent, className = '', children }) {
  return (
    <section id={id} data-accent={accent} aria-labelledby={`${id}-title`} className={`scroll-mt-16 ${className}`}>
      {children}
    </section>
  );
}

/** Top of each section: mono eyebrow, display title, short intro. */
export function SectionIntro({ id, eyebrow, title, intro, children }) {
  return (
    <header className="pb-12 pt-24 sm:pb-16 sm:pt-32">
      <motion.p
        className="label flex items-center gap-2 text-accent-ink"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 0.4 }}
      >
        <span className="size-2 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </motion.p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
        <WordReveal text={title} delay={0.05} />
      </h2>
      {intro && (
        <motion.p
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}
        >
          {intro}
        </motion.p>
      )}
      {children}
    </header>
  );
}

/** Sub-heading inside a section: mono index and a hairline rule above. */
export default function SectionHeading({ index, title, kicker, id, className = '' }) {
  return (
    <Reveal className={`border-t border-line pt-6 ${className}`}>
      <div className="flex items-baseline gap-4">
        {index && <span className="label text-accent-ink">{index}</span>}
        {kicker && <span className="label text-muted">{kicker}</span>}
      </div>
      <h3 id={id} className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.01em]">
        {title}
      </h3>
    </Reveal>
  );
}

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
