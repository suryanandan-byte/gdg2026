import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { sections, externalNav, accentFor } from '../data/navigation';
import { getJoinHref, isExternal } from '../data/siteConfig';
import { useMark, MARK_COLORS, markSpring } from './MarkContext';
import Logo from './Logo';

function NavMark() {
  const { heroActive } = useMark();
  return (
    <span className="flex h-3 w-[42px] items-center gap-[3px]" aria-hidden>
      {!heroActive &&
        MARK_COLORS.map((color, i) => (
          <motion.span
            key={i}
            layoutId={`gdg-mark-${i}`}
            transition={markSpring}
            className="block size-3"
            style={{ backgroundColor: color, borderRadius: 999 }}
          />
        ))}
    </span>
  );
}

export function JoinButton({ className = '', children = 'Join us', onClick }) {
  const href = getJoinHref();
  const external = isExternal(href);
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent-ink ${className}`}
    >
      {children} {external && <ArrowUpRight size={15} />}
    </a>
  );
}

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      data-accent={accentFor(active)}
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-b border-line-soft bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#home" className="flex items-center gap-2.5 text-[15px] text-ink" aria-label="GDG VIIT — back to top">
          <NavMark />
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block px-3 py-2 text-[15px] transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  <span className="link-underline">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={externalNav.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1 px-3 py-2 text-[15px] text-muted transition-colors hover:text-ink"
            >
              <span className="link-underline">{externalNav.label}</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
          <li className="ml-2">
            <JoinButton />
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-line bg-surface md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="px-5 pb-6 pt-2">
              {sections.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={close}
                    className={`flex items-center justify-between border-b border-line-soft py-3.5 text-lg ${active === item.id ? 'text-ink' : 'text-muted'}`}
                  >
                    {item.label}
                    {active === item.id && <span className="size-2 rounded-full bg-accent" />}
                  </a>
                </motion.li>
              ))}
              <li>
                <a
                  href={externalNav.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-b border-line-soft py-3.5 text-lg text-muted"
                >
                  {externalNav.label} <ArrowUpRight size={18} />
                </a>
              </li>
              <li className="pt-5">
                <JoinButton className="w-full justify-center py-3" onClick={close} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
