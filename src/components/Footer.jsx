import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import { sections } from '../data/navigation';
import { Container } from './SectionHeading';
import Reveal from './Reveal';
import SocialLinks from './SocialLinks';
import Logo from './Logo';

function GlobalCommunityBand() {
  const { globalCommunity } = siteConfig;
  return (
    <section aria-labelledby="global-community" className="border-t border-line">
      <Container className="grid gap-8 py-16 sm:py-20 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <p className="label text-muted">Part of something bigger</p>
          <h2 id="global-community" className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight">
            {globalCommunity.intro}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.a
            href={globalCommunity.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-ink px-5 py-3 text-[15px] font-medium transition-colors duration-300 hover:bg-ink hover:text-paper"
            whileTap={{ scale: 0.97 }}
          >
            Explore {globalCommunity.label}
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="mt-32">
      <GlobalCommunityBand />
      <div className="border-t border-line bg-paper-deep/50">
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo textClassName="text-xl" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.oneLiner}</p>
          </div>
          <nav aria-label="Footer">
            <p className="label text-muted">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-[15px]">
              {sections.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="link-underline text-ink-soft hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label text-muted">Follow</p>
            <SocialLinks size="sm" className="mt-4" />
          </div>
        </Container>
        <Container className="flex flex-col gap-2 border-t border-line-soft py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}
          </p>
          <p className="label">Tenure {siteConfig.tenure}</p>
        </Container>
      </div>
    </footer>
  );
}
