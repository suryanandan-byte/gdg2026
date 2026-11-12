import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import GDGLogoAnimation from '../components/GDGLogoAnimation';
import { JoinButton } from '../components/Navbar';
import { easeOut } from '../components/Reveal';
import { siteConfig } from '../data/siteConfig';
import { nextEvent, formatDate } from '../data/events';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOut, delay },
});

export default function Home() {
  const [settled, setSettled] = useState(false);
  const onSettled = useCallback(() => setSettled(true), []);
  const upcoming = nextEvent();

  return (
    <section id="home" data-accent="blue" aria-labelledby="home-title" className="relative flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-6 text-center">
        <GDGLogoAnimation onSettled={onSettled} />

        <div className={settled ? '' : 'invisible'}>
          {settled && (
            <>
              <motion.h1
                id="home-title"
                {...fadeUp(0)}
                className="mt-12 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-ink"
              >
                {siteConfig.shortName}
              </motion.h1>
              <motion.p {...fadeUp(0.12)} className="mt-4 text-[clamp(1.05rem,2vw,1.35rem)] font-medium text-ink-soft">
                {siteConfig.name}
              </motion.p>
              <motion.p {...fadeUp(0.22)} className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
                {siteConfig.oneLiner}
              </motion.p>

              <motion.div {...fadeUp(0.34)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <JoinButton className="px-5 py-2.5 text-[15px]">Join the chapter</JoinButton>
                <a
                  href="#about"
                  className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] text-ink-soft transition-colors hover:text-ink"
                >
                  <span className="link-underline">About the club</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>

              {upcoming && (
                <motion.div {...fadeUp(0.46)} className="mt-10">
                  <a
                    href="#events"
                    className="group inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-surface/70 py-2 pl-2 pr-4 text-sm shadow-soft transition-shadow hover:shadow-lift"
                  >
                    <span className="label rounded-full bg-g-red px-2.5 py-1 text-[0.66rem] text-white">Next</span>
                    <span className="label shrink-0 text-muted">{formatDate(upcoming.date, { day: '2-digit', month: 'short' })}</span>
                    <span className="truncate text-ink">{upcoming.title}</span>
                    <ArrowRight size={14} className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="mx-auto mb-6 grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: settled ? 1 : 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
