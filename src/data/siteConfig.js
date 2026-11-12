/**
 * Central club configuration.
 * Everything in [square brackets] or marked TODO is a placeholder —
 * replace it with verified information before going live.
 */
export const siteConfig = {
  shortName: 'GDG VIIT',
  name: 'Google Developer Groups',
  fullName: 'Google Developer Groups – VIIT',
  tenure: '2026–27', // TODO: confirm current tenure
  oneLiner:
    'A student developer community at VIIT — learning, building and sharing with Google technologies.',

  /**
   * Official GDG logo. Drop the official file into /public/logos/ and set
   * the path here, e.g. '/logos/gdg-viit.svg'. It is rendered untouched.
   * While null, a plain text wordmark is shown instead.
   */
  logo: { src: null, alt: 'Google Developer Groups VIIT logo' },

  /** Where "Join" points. Use your GDG chapter page or community group link. */
  joinUrl: '', // TODO: e.g. your chapter page on gdg.community.dev — falls back to the Contact section

  globalCommunity: {
    // TODO: confirm the official URL
    url: 'https://gdg.community.dev/',
    label: 'GDG Global Community',
    intro:
      'GDG VIIT is one chapter in a worldwide network of Google Developer Groups — local communities where developers meet, learn and build together.',
  },

  contact: {
    email: 'gdg.viit@example.com', // TODO: official email
    addressLines: ['[College full name]', '[Campus address line]', '[City, State – PIN]'],
    /**
     * Form submission endpoint (e.g. a Formspree form URL).
     * Leave empty and the form will offer to open the visitor's email app instead.
     */
    formEndpoint: '',
  },

  /** Social links — empty url means "not set yet" and renders as disabled. */
  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@gdg.viit', url: '' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'GDG VIIT', url: '' },
    { id: 'github', label: 'GitHub', handle: 'gdg-viit', url: '' },
    { id: 'x', label: 'X', handle: '@gdgviit', url: '' },
    { id: 'youtube', label: 'YouTube', handle: 'GDG VIIT', url: '' },
  ],

  /** Impact figures — value: null shows as "to be verified". */
  impact: [
    { label: 'Events hosted', value: null },
    { label: 'Community members', value: null },
    { label: 'Workshop hours', value: null },
    { label: 'Projects built', value: null },
  ],
};

export const getJoinHref = () => siteConfig.joinUrl || '#contact';
export const isExternal = (href) => /^https?:\/\//.test(href);
