import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Container } from './SectionHeading';
import Reveal from './Reveal';
import Logo from './Logo';

export default function Footer() {
  const { globalCommunity } = siteConfig;
  return (
    <footer className="mt-20">
      {/* Global GDG community */}
      <section aria-labelledby="global-community" className="border-t border-line">
        <Container className="flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="label text-muted">Part of something bigger</p>
            <h2 id="global-community" className="mt-2 max-w-xl font-semibold leading-snug sm:text-lg">
              {globalCommunity.intro}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <a
              href={globalCommunity.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Explore {globalCommunity.label}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </Container>
      </section>

      <div className="border-t border-line bg-paper-deep/50">
        <Container className="flex flex-col gap-2 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Logo textClassName="text-ink" />
            <span>© {new Date().getFullYear()} {siteConfig.fullName}</span>
          </p>
          <p className="label">Tenure {siteConfig.tenure}</p>
        </Container>
      </div>
    </footer>
  );
}
