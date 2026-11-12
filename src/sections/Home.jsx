import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import GDGLogoAnimation from '../components/GDGLogoAnimation';
import HeroBackdrop from '../components/HeroBackdrop';
import { JoinButton } from '../components/Navbar';
import { easeOut } from '../components/Reveal';
import { useMark, HERO_DARK } from '../components/MarkContext';
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

  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const [centerY, setCenterY] = useState(0);
  const inView = useInView(heroRef, { margin: '0px 0px -10% 0px' });
  const { heroDark, setHeroDark } = useMark();

  // Dark → paper as the hero scrolls away. Text flips to dark ink halfway.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const darkOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setHeroDark(v < 0.27));
  useEffect(() => setHeroDark(scrollYProgress.get() < 0.27), [scrollYProgress, setHeroDark]);

  // Centre the orbit rings on the G·D·G circles.
  useEffect(() => {
    const measure = () => {
      if (!heroRef.current || !logoRef.current) return;
      const hero = heroRef.current.getBoundingClientRect();
      const logo = logoRef.current.getBoundingClientRect();
      setCenterY(logo.top - hero.top + logo.height / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, [settled]);

  const dark = heroDark;

  return (
    <section
      ref={heroRef}
      id="home"
      data-accent="blue"
      aria-labelledby="home-title"
      className="relative -mt-16 flex min-h-dvh flex-col pt-16"
    >
      {/* Dark backdrop with orbits + stickers; fades out on scroll */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: darkOpacity, backgroundColor: HERO_DARK }}>
        <HeroBackdrop centerY={centerY} showStickers={settled} play={inView} />
      </motion.div>

      <div className="pointer-events-none relative flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-6 text-center">
        <div ref={logoRef} className="pointer-events-auto">
          <GDGLogoAnimation onSettled={onSettled} />
        </div>

        <div className={`pointer-events-auto ${settled ? '' : 'invisible'}`}>
          {settled && (
            <>
              <motion.h1
                id="home-title"
                {...fadeUp(0)}
                className={`mt-12 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.9] tracking-[-0.03em] transition-colors duration-500 ${
                  dark ? 'text-paper' : 'text-ink'
                }`}
              >
                {siteConfig.shortName}
              </motion.h1>
              <motion.p
                {...fadeUp(0.12)}
                className={`mt-4 text-[clamp(1.05rem,2vw,1.35rem)] font-medium transition-colors duration-500 ${
                  dark ? 'text-paper/85' : 'text-ink-soft'
                }`}
              >
                {siteConfig.name}
              </motion.p>
              <motion.p
                {...fadeUp(0.22)}
                className={`mx-auto mt-5 max-w-md leading-relaxed transition-colors duration-500 ${dark ? 'text-paper/65' : 'text-muted'}`}
              >
                {siteConfig.oneLiner}
              </motion.p>

              <motion.div {...fadeUp(0.34)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <JoinButton className="px-5 py-2.5 text-[15px]" onDark={dark}>
                  Join the chapter
                </JoinButton>
                <a
                  href="#about"
                  className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] transition-colors duration-500 ${
                    dark ? 'text-paper/80 hover:text-paper' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span className="link-underline">About the club</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>

              {upcoming && (
                <motion.div {...fadeUp(0.46)} className="mt-10">
                  <a
                    href="#events"
                    className={`group inline-flex max-w-full items-center gap-3 rounded-full border py-2 pl-2 pr-4 text-sm backdrop-blur-sm transition-colors duration-500 ${
                      dark ? 'border-white/15 bg-white/5 hover:bg-white/10' : 'border-line bg-surface/70 shadow-soft'
                    }`}
                  >
                    <span className="label rounded-full bg-g-red px-2.5 py-1 text-[0.66rem] text-white">Next</span>
                    <span className={`label shrink-0 ${dark ? 'text-paper/60' : 'text-muted'}`}>
                      {formatDate(upcoming.date, { day: '2-digit', month: 'short' })}
                    </span>
                    <span className={`truncate ${dark ? 'text-paper' : 'text-ink'}`}>{upcoming.title}</span>
                    <ArrowRight
                      size={14}
                      className={`shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 ${dark ? 'text-paper/60' : 'text-muted'}`}
                    />
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
        className={`relative mx-auto mb-6 grid size-10 place-items-center rounded-full transition-colors ${
          dark ? 'text-paper/60 hover:text-paper' : 'text-muted hover:text-ink'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: settled ? 1 : 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
