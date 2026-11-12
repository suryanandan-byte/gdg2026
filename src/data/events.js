/**
 * Events — single source of truth.
 *
 * ALL ENTRIES BELOW ARE SAMPLE DATA (isSample: true) to demonstrate the layout.
 * Replace them with real events. Status (upcoming / completed) is derived
 * from the date automatically.
 *
 * Fields
 *   type:            'workshop' | 'hackathon' | 'talk'
 *   date / time:     'YYYY-MM-DD' and a free-text time range
 *   cover:           image path in /public/events/ or null for a designed placeholder
 *   registrationUrl: external link for upcoming events, or null ("link coming soon")
 *   gallery:         image paths for completed events
 */
export const eventTypes = [
  { id: 'all', label: 'All types' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'talk', label: 'Tech Talks & Sessions' },
];

export const typeLabel = {
  workshop: 'Workshop',
  hackathon: 'Hackathon',
  talk: 'Tech Talk',
};

export const events = [
  {
    id: 'sample-cloud-study-jam',
    isSample: true,
    title: 'Google Cloud Study Jam',
    type: 'workshop',
    date: '2026-12-06',
    time: '10:00 – 13:00',
    venue: '[Venue TBA]',
    summary: 'A guided, hands-on session working through Google Cloud labs together.',
    description:
      'Sample description. Participants work through a set of Google Cloud skill badges with mentors in the room. Bring a laptop; no prior cloud experience is required.',
    info: ['Bring your own laptop', 'Beginner friendly', 'Seats limited — registration required'],
    cover: null,
    registrationUrl: null,
  },
  {
    id: 'sample-build-with-ai',
    isSample: true,
    title: 'Build with AI — Intro to Gemini APIs',
    type: 'talk',
    date: '2027-01-17',
    time: '14:00 – 16:00',
    venue: '[Venue TBA]',
    summary: 'A short talk and live demo on getting started with generative AI APIs.',
    description:
      'Sample description. A speaker walks through calling a generative AI API, prompt design basics and responsible use, followed by open Q&A.',
    info: ['Open to all years', 'Q&A at the end'],
    cover: null,
    registrationUrl: null,
  },
  {
    id: 'sample-campus-hackathon',
    isSample: true,
    title: 'Campus Hackathon',
    type: 'hackathon',
    date: '2027-02-20',
    time: '24 hours',
    venue: '[Venue TBA]',
    summary: 'Form a team, pick a problem statement and ship a working prototype.',
    description:
      'Sample description. Teams of up to four build a prototype over a day, with mentor check-ins and a final demo round in front of judges.',
    info: ['Teams of 2–4', 'Mentors on site', 'Final demos judged'],
    cover: null,
    registrationUrl: null,
  },
  {
    id: 'sample-web-dev-bootcamp',
    isSample: true,
    title: 'Web Development Bootcamp',
    type: 'workshop',
    date: '2026-10-11',
    time: '10:00 – 16:00',
    venue: '[Venue TBA]',
    summary: 'A day of building and deploying a small web app from scratch.',
    description:
      'Sample description. Attendees built a small single-page app step by step and deployed it by the end of the day.',
    info: ['Hands-on', 'Beginner friendly'],
    cover: null,
    registrationUrl: null,
    highlights: ['[Highlight — to be added]', '[Highlight — to be added]'],
    activities: ['[Key activity — to be added]', '[Key activity — to be added]'],
    outcomes: ['[Outcome — to be added]'],
    gallery: [],
  },
  {
    id: 'sample-dsa-talk',
    isSample: true,
    title: 'Cracking Problem Solving: DSA Session',
    type: 'talk',
    date: '2026-09-20',
    time: '15:00 – 17:00',
    venue: '[Venue TBA]',
    summary: 'Patterns and practice strategies for competitive programming.',
    description: 'Sample description. A session on common problem-solving patterns and how to practise consistently.',
    info: ['All years'],
    cover: null,
    registrationUrl: null,
    highlights: ['[Highlight — to be added]'],
    activities: ['[Key activity — to be added]'],
    outcomes: ['[Outcome — to be added]'],
    gallery: [],
  },
  {
    id: 'sample-ideathon',
    isSample: true,
    title: 'Solution Challenge Ideathon',
    type: 'hackathon',
    date: '2026-08-30',
    time: '09:00 – 18:00',
    venue: '[Venue TBA]',
    summary: 'Teams pitched ideas addressing real community problems.',
    description: 'Sample description. Teams shaped ideas around a social-good theme and pitched them to a panel.',
    info: ['Team event'],
    cover: null,
    registrationUrl: null,
    highlights: ['[Highlight — to be added]'],
    activities: ['[Key activity — to be added]'],
    outcomes: ['[Outcome — to be added]'],
    gallery: [],
  },
];

const todayISO = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const statusOf = (event) => (event.date >= todayISO() ? 'upcoming' : 'completed');

export const sortedEvents = (list, status) =>
  [...list].sort((a, b) =>
    status === 'upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
  );

export const nextEvent = () =>
  sortedEvents(
    events.filter((e) => statusOf(e) === 'upcoming'),
    'upcoming',
  )[0] ?? null;

export const formatDate = (iso, opts = { day: '2-digit', month: 'short', year: 'numeric' }) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', opts);
