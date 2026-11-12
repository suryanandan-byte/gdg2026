import { useState } from 'react';
import { Container, Section, SectionIntro } from '../components/SectionHeading';
import TeamDial from '../components/TeamDial';
import TeamMember from '../components/TeamMember';
import Reveal from '../components/Reveal';
import { dials, membersOf, team } from '../data/team';
import { siteConfig } from '../data/siteConfig';

export default function Team() {
  const [selectedId, setSelectedId] = useState(team[0].id);
  const [previewId, setPreviewId] = useState(null);
  const shown = team.find((m) => m.id === (previewId ?? selectedId));
  const shownDial = dials.find((d) => d.id === shown.dial);

  const dialProps = (dial) => ({
    dial,
    members: membersOf(dial.id),
    activeId: shown.id,
    onPreview: setPreviewId,
    onSelect: (id) => {
      setSelectedId(id);
      setPreviewId(null);
    },
  });

  return (
    <Section id="team" accent="yellow">
      <Container>
        <SectionIntro
          id="team-title"
          eyebrow={`Team · ${siteConfig.tenure}`}
          title="Meet the team"
          intro="Hover or tap a circle on either dial to meet the organisers and domain leads."
        />

        <Reveal className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)_300px] lg:gap-6">
          <TeamDial {...dialProps(dials[0])} large maxSize={300} />
          <div className="lg:order-none order-last">
            <TeamDial {...dialProps(dials[1])} maxSize={420} />
          </div>
          <TeamMember member={shown} dialTitle={`Dial ${shownDial.index} — ${shownDial.title}`} />
        </Reveal>
      </Container>
    </Section>
  );
}
