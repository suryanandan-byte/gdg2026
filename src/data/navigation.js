import { siteConfig } from './siteConfig';

/**
 * Sections of the single-page site, in scroll order.
 * Each section owns one Google colour as its accent.
 */
export const sections = [
  { id: 'home', label: 'Home', accent: 'blue' },
  { id: 'about', label: 'About', accent: 'blue' },
  { id: 'events', label: 'Events', accent: 'red' },
  { id: 'team', label: 'Team', accent: 'yellow' },
  { id: 'contact', label: 'Contact', accent: 'green' },
];

export const externalNav = {
  label: 'GDG Global',
  href: siteConfig.globalCommunity.url,
};

export const accentFor = (id) => sections.find((s) => s.id === id)?.accent ?? 'blue';
