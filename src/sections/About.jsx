import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionIntro } from '../components/SectionHeading';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import { siteConfig } from '../data/siteConfig';

/* Copy below is general and editable — replace with the club's own words. */
const activities = [
  { title: 'Technical workshops', text: 'Hands-on sessions where everyone builds alongside a mentor.', tag: 'Build' },
  { title: 'Hackathons', text: 'Short, focused sprints to turn ideas into working prototypes.', tag: 'Ship' },
  { title: 'Tech talks', text: 'Speakers from campus and industry on what they work on.', tag: 'Listen' },
  { title: 'Google Cloud Study Jams', text: 'Guided cohorts working through Google Cloud learning paths.', tag: 'Learn' },
  { title: 'Developer meetups', text: 'Informal evenings to show projects and meet other builders.', tag: 'Meet' },
  { title: 'Learning sessions', text: 'Regular domain sessions — AI/ML, cloud, web, DSA and design.', tag: 'Grow' },
];

const culture = [
  { title: 'Collaboration', text: 'Projects are built in teams, across years and domains.' },
  { title: 'Peer learning', text: 'Students teach students — the best way to learn something is to explain it.' },
  { title: 'Knowledge sharing', text: 'Notes, slides and recordings are shared openly with the community.' },
  { title: 'Practical development', text: 'We favour building real things over only reading about them.' },
  { title: 'Developer growth', text: 'From first “hello world” to first open-source contribution.' },
];

const milestones = ['[Milestone — to be added]', '[Milestone — to be added]', '[Milestone — to be added]'];

export default function About() {
  return (
    <Section id="about" accent="blue">
    <Container>
      <SectionIntro
        id="about-title"
        eyebrow="About"
        title="A community for students who build"
        intro={`${siteConfig.shortName} brings together students who want to learn developer technologies by doing — together.`}
      />

      <div className="space-y-24 sm:space-y-32">
        {/* A. Introduction */}
        <div>
          <SectionHeading id="intro" index="01" title="Who we are" />
          <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <Reveal className="space-y-5 text-[1.075rem] leading-relaxed text-ink-soft">
              <p>
                <span className="font-semibold text-ink">{siteConfig.fullName}</span> is a student-run chapter of
                Google Developer Groups — a global programme of local communities for developers interested in Google
                technologies.
              </p>
              <p>
                On campus, we are a place to pick up new skills, find teammates and get comfortable building in public.
                Sessions are open to every branch and year, whether you are writing your first program or shipping
                your fifth project.
              </p>
              <p className="label pt-2 text-muted">[Add founding year and chapter background once confirmed]</p>
            </Reveal>
            <Reveal delay={0.1}>
              <PhotoPlaceholder className="aspect-[4/5] w-full" caption="Community photo" />
            </Reveal>
          </div>
        </div>

        {/* B. Vision & mission */}
        <div>
          <SectionHeading id="vision" index="02" title="Vision & mission" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                k: 'Vision',
                t: 'A campus where every student has the confidence and community to build with technology.',
              },
              {
                k: 'Mission',
                t: 'Run practical, inclusive learning experiences — and connect students with the wider developer ecosystem.',
              },
            ].map((item, i) => (
              <Reveal key={item.k} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-soft sm:p-9">
                  <p className="label text-accent-ink">{item.k}</p>
                  <p className="mt-4 text-[clamp(1.25rem,2.4vw,1.6rem)] font-medium leading-snug text-ink">{item.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* C. Activities */}
        <div>
          <SectionHeading id="activities" index="03" title="What we do" />
          <ul className="mt-8">
            {activities.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.04}>
                <motion.div
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line-soft py-6 sm:grid-cols-[3rem_1fr_1.3fr_auto] sm:gap-x-8"
                  whileHover="hover"
                >
                  <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <motion.h4
                    className="text-xl font-semibold text-ink sm:text-2xl"
                    variants={{ hover: { x: 6 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    {a.title}
                  </motion.h4>
                  <p className="col-start-2 leading-relaxed text-muted sm:col-start-auto">{a.text}</p>
                  <span className="label col-start-2 mt-2 w-fit rounded-full border border-line px-2.5 py-1 text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent-ink sm:col-start-auto sm:mt-0">
                    {a.tag}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* D. Learning culture */}
        <div>
          <SectionHeading id="culture" index="04" title="How we learn" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <PhotoPlaceholder className="aspect-[4/3] w-full" caption="Workshop in progress" />
            </Reveal>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {culture.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.05}>
                  <div className="border-l-2 border-accent pl-5">
                    <h4 className="text-lg font-semibold text-ink">{c.title}</h4>
                    <p className="mt-1.5 leading-relaxed text-muted">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* E. Impact — values stay "to be verified" until supplied */}
        <div>
          <SectionHeading id="impact" index="05" title="Community impact" />
          <div className="mt-10 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
            {siteConfig.impact.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06} className="border-b border-r border-line p-6 sm:p-8">
                <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-none text-ink">{stat.value ?? '—'}</p>
                <p className="mt-3 text-ink-soft">{stat.label}</p>
                {stat.value == null && <p className="label mt-1 text-[0.62rem] text-muted">To be verified</p>}
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_2fr]">
            <Reveal>
              <h4 className="label text-muted">Milestones</h4>
            </Reveal>
            <ol className="space-y-4">
              {milestones.map((m, i) => (
                <Reveal as="li" key={i} delay={i * 0.05} className="flex gap-4 text-muted">
                  <span className="label pt-0.5 text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
                  {m}
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal className="mt-14">
            <a href="#events" className="group inline-flex items-center gap-2 text-lg font-medium text-ink">
              <span className="link-underline">See what we’ve been running</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </Container>
    </Section>
  );
}
