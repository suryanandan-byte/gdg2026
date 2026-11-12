import { Container, Section, SectionIntro } from '../components/SectionHeading';
import SectionHeading from '../components/SectionHeading';
import TeamDial from '../components/TeamDial';
import Reveal from '../components/Reveal';
import { dials, membersOf, team } from '../data/team';
import { siteConfig } from '../data/siteConfig';

export default function Team() {
  return (
    <Section id="team" accent="yellow">
    <Container>
      <SectionIntro
        id="team-title"
        eyebrow={`Team · Tenure ${siteConfig.tenure}`}
        title="The people behind GDG VIIT"
        intro="Turn the dial. Hover or tap a circle to meet the organisers and domain leads running the chapter this tenure."
      />

      <div className="space-y-24 sm:space-y-28">
        {dials.map((dial) => {
          const members = membersOf(dial.id);
          return (
            <div key={dial.id}>
              <SectionHeading
                id={`dial-${dial.id}`}
                index={`Dial ${dial.index}`}
                kicker={`${members.length} members`}
                title={dial.title}
              />
              <Reveal className="mt-10">
                <TeamDial
                  dial={dial}
                  members={members}
                  large={dial.id === 'leadership'}
                  maxSize={dial.id === 'leadership' ? 460 : 560}
                />
              </Reveal>
            </div>
          );
        })}

        <div>
          <SectionHeading id="roster" index="Roster" title="Everyone, at a glance" />
          <Reveal className="mt-8">
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.id} className="flex items-baseline justify-between gap-4 border-b border-line-soft py-3">
                  <span className="text-ink">{m.name}</span>
                  <span className="label shrink-0 text-muted">{m.domain}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Container>
    </Section>
  );
}
