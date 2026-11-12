import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Container, Section, SectionIntro } from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import BrandIcon from '../components/BrandIcons';
import { siteConfig } from '../data/siteConfig';

export default function Contact() {
  const { contact, socials } = siteConfig;
  return (
    <Section id="contact" accent="green">
    <Container>
      <SectionIntro
        id="contact-title"
        eyebrow="Contact"
        title="Say hello"
        intro="Questions about events, ideas for a collaboration or interested in sponsoring? Drop us a line."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal className="space-y-10">
          <div>
            <p className="label flex items-center gap-2 text-muted">
              <Mail size={14} aria-hidden /> Email
            </p>
            <a href={`mailto:${contact.email}`} className="link-underline mt-3 inline-block text-xl font-medium text-ink break-all">
              {contact.email}
            </a>
          </div>

          <div>
            <p className="label flex items-center gap-2 text-muted">
              <MapPin size={14} aria-hidden /> Address
            </p>
            <address className="mt-3 not-italic leading-relaxed text-ink-soft">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <p className="label text-muted">Elsewhere</p>
            <ul className="mt-3 border-t border-line-soft">
              {socials.map((s) => {
                const inner = (
                  <>
                    <span className="flex items-center gap-3">
                      <BrandIcon name={s.id} size={18} />
                      <span className="text-ink">{s.label}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted">
                      {s.url ? s.handle : 'Coming soon'}
                      {s.url && (
                        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </>
                );
                return (
                  <li key={s.id} className="border-b border-line-soft">
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between py-3.5 transition-[padding] duration-300 hover:pl-2 hover:text-accent-ink"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center justify-between py-3.5 opacity-60">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Container>
    </Section>
  );
}
