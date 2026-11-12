/**
 * Team directory — single source of truth.
 *
 * To update a member:
 *   photo:   path to an image in /public/team/ (e.g. '/team/mani.jpg'), or null
 *   bio:     a short line written by the member, or null for the placeholder
 *   socials: add only real profile URLs; missing keys are simply not shown
 */
const placeholderBio = null;

export const dials = [
  { id: 'leadership', index: '01', title: 'Leadership' },
  { id: 'domain', index: '02', title: 'Domain Team' },
];

export const team = [
  // Dial 01 — Leadership
  { id: 'deepanwitha', name: 'Deepanwitha Gopisetty', role: 'Organiser', domain: 'Organiser', dial: 'leadership' },
  { id: 'mani', name: 'Mani Varshith', role: 'Organiser', domain: 'Organiser', dial: 'leadership' },
  { id: 'anshika', name: 'Anshika Vishwakarma', role: 'Organiser', domain: 'Organiser', dial: 'leadership' },
  { id: 'danush', name: 'Kaviti Danush', role: 'Co-Lead', domain: 'Co-Lead', dial: 'leadership' },

  // Dial 02 — Domain Team
  { id: 'siri', name: 'Siri Vennela', role: 'AI/ML Lead', domain: 'AI/ML', dial: 'domain' },
  { id: 'sahithi', name: 'G. Sahithi', role: 'Cloud Lead', domain: 'Cloud', dial: 'domain' },
  { id: 'nishanth', name: 'Nishanth Varma', role: 'Content Lead', domain: 'Content', dial: 'domain' },
  { id: 'prasanna', name: 'Yerra Prasanna', role: 'Content Lead', domain: 'Content', dial: 'domain' },
  { id: 'praneeth', name: 'Chakka Sri Praneeth', role: 'CP/DSA Lead', domain: 'CP/DSA', dial: 'domain' },
  { id: 'raza', name: 'Md Ahamed Raza', role: 'Events Lead', domain: 'Events', dial: 'domain' },
  { id: 'jahnavi', name: 'Yenneti Jahnavi', role: 'Events Lead', domain: 'Events', dial: 'domain' },
  { id: 'srikanth', name: 'Srikanth Kadiri', role: 'Social Media Lead', domain: 'Social Media', dial: 'domain' },
  { id: 'kousik', name: 'Puppala Kousik Sri Surya Nandan', role: 'Web Dev Lead', domain: 'Web Dev', dial: 'domain' },
  { id: 'neelaganesh', name: 'D. Neelaganesh', role: 'Web Dev Lead', domain: 'Web Dev', dial: 'domain' },
  { id: 'harshitha', name: 'Channa Venkata Harshitha', role: 'UI/UX Lead', domain: 'UI/UX', dial: 'domain' },
].map((member) => ({
  photo: null,
  bio: placeholderBio,
  socials: {}, // e.g. { linkedin: 'https://…', github: 'https://…', instagram: 'https://…' }
  ...member,
}));

export const membersOf = (dialId) => team.filter((m) => m.dial === dialId);

export const initialsOf = (name) =>
  name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
