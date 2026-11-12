import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Container, Section, SectionIntro } from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import BrandIcon from '../components/BrandIcons';
import { siteConfig } from '../data/siteConfig';

function ChannelCard({ icon, label, handle, href, external = true }) {
  const body = (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-tight text-ink">{label}</span>
        <span className="block truncate text-sm text-muted">{href ? handle : 'Coming soon'}</span>
      </span>
      {href && (
        <ArrowUpRight
          size={16}
          className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
        />
      )}
    </>
  );

  const card = 'group flex h-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 shadow-soft';

  if (!href) {
    return (
      <div className={`${card} opacity-55`} aria-label={`${label} — coming soon`}>
        {body}
      </div>
    );
  }
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`${card} transition-shadow duration-300 hover:shadow-lift`}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
    >
      {body}
    </motion.a>
  );
}

export default function Contact() {
  const { contact, socials } = siteConfig;
  return (
    <Section id="contact" accent="green">
      <Container>
        <SectionIntro id="contact-title" eyebrow="Contact" title="Contact us" intro="Questions, collaborations or just saying hi — find us here." />

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-5">
          <Reveal as="li">
            <ChannelCard
              icon={<Mail size={16} />}
              label="Email"
              handle={contact.email}
              href={contact.email ? `mailto:${contact.email}` : ''}
              external={false}
            />
          </Reveal>
          {socials.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i + 1) * 0.05}>
              <ChannelCard icon={<BrandIcon name={s.id} size={16} />} label={s.label} handle={s.handle} href={s.url} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
