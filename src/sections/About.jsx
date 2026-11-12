import { Container, Section, SectionIntro } from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { siteConfig } from '../data/siteConfig';

/* Copy below is general and editable — replace with the club's own words. */
const activities = [
  { title: 'Workshops', text: 'Hands-on sessions, building alongside a mentor.' },
  { title: 'Hackathons', text: 'Short sprints from idea to working prototype.' },
  { title: 'Tech talks', text: 'Speakers from campus and industry.' },
  { title: 'Cloud Study Jams', text: 'Guided Google Cloud learning cohorts.' },
  { title: 'Meetups', text: 'Show projects and meet other builders.' },
  { title: 'Learning sessions', text: 'AI/ML, cloud, web, DSA and design.' },
];

export default function About() {
  return (
    <Section id="about" accent="blue">
      <Container>
        <SectionIntro
          id="about-title"
          eyebrow="About"
          title="A community for students who build"
          intro={`${siteConfig.fullName} is a student-run chapter of Google Developer Groups — a place to learn new skills, find teammates and build in public. Open to every branch and year.`}
        />

        <ul className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
          {activities.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={i * 0.04}
              className="group border-b border-r border-line p-4 transition-colors duration-300 hover:bg-surface sm:p-6"
            >
              <span className="label text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-semibold text-ink sm:text-lg">{a.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
