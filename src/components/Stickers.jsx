/**
 * Flat space / innovation stickers (original artwork, Google palette).
 * Each draws on a 64×64 grid with a dark ink outline; the white die-cut
 * border and shadow are added in CSS (see .sticker in global.css).
 */
const INK = '#1C1B19';
const PAPER = '#F5F1E8';
const BLUE = '#4285F4';
const RED = '#EA4335';
const YELLOW = '#FBBC04';
const GREEN = '#34A853';

const line = { stroke: INK, strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' };

export const Rocket = () => (
  <svg viewBox="0 0 64 64">
    <path d="M26 44 Q32 62 38 44Z" fill={YELLOW} {...line} />
    <path d="M23 34 L13 47 L23 45Z" fill={RED} {...line} />
    <path d="M41 34 L51 47 L41 45Z" fill={RED} {...line} />
    <path d="M32 5 C43 13 45 29 42 45 H22 C19 29 21 13 32 5Z" fill={PAPER} {...line} />
    <circle cx="32" cy="24" r="5.5" fill={BLUE} {...line} />
    <path d="M27 39 H37" {...line} />
  </svg>
);

export const Planet = () => (
  <svg viewBox="0 0 64 64">
    <path d="M9 41 C3 34 22 22 38 17 C53 12 63 15 58 22" fill="none" stroke={YELLOW} strokeWidth="5" strokeLinecap="round" />
    <circle cx="32" cy="32" r="15" fill={GREEN} {...line} />
    <path d="M24 26 A9 9 0 0 1 31 21" fill="none" stroke={PAPER} strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
    <path d="M58 22 C63 29 44 41 28 46 C13 51 3 48 7 41" fill="none" stroke={YELLOW} strokeWidth="5" strokeLinecap="round" />
    <path d="M58 22 C63 29 44 41 28 46 C13 51 3 48 7 41" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity=".35" />
  </svg>
);

export const Bulb = () => (
  <svg viewBox="0 0 64 64">
    <path d="M32 7a16 16 0 0 0-9.5 28.9c2 1.6 3.5 3.9 3.5 6.6V45h12v-2.5c0-2.7 1.5-5 3.5-6.6A16 16 0 0 0 32 7z" fill={YELLOW} {...line} />
    <path d="M28 29 l4 5 4-5" fill="none" {...line} />
    <path d="M32 34 v11" {...line} />
    <rect x="25.5" y="45" width="13" height="5" rx="1.5" fill={PAPER} {...line} />
    <rect x="27.5" y="50" width="9" height="5" rx="2" fill={PAPER} {...line} />
    <path d="M24 17 a10 10 0 0 1 6-5" fill="none" stroke={PAPER} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const Satellite = () => (
  <svg viewBox="0 0 64 64">
    <g transform="rotate(-35 32 32)">
      <rect x="4" y="25" width="17" height="14" rx="1.5" fill={BLUE} {...line} />
      <path d="M12.5 25 v14 M4 32 h17" stroke={PAPER} strokeWidth="1.6" />
      <rect x="43" y="25" width="17" height="14" rx="1.5" fill={BLUE} {...line} />
      <path d="M51.5 25 v14 M43 32 h17" stroke={PAPER} strokeWidth="1.6" />
      <path d="M21 32 h4 M39 32 h4" {...line} />
      <rect x="25" y="23" width="14" height="18" rx="3" fill={PAPER} {...line} />
      <path d="M32 23 v-6" {...line} />
      <circle cx="32" cy="15" r="3" fill={RED} {...line} />
    </g>
  </svg>
);

export const Sparkle = ({ color = YELLOW }) => (
  <svg viewBox="0 0 64 64">
    <path d="M32 6 C34 24 40 30 58 32 C40 34 34 40 32 58 C30 40 24 34 6 32 C24 30 30 24 32 6Z" fill={color} {...line} />
  </svg>
);

export const Comet = () => (
  <svg viewBox="0 0 64 64">
    <path d="M40 24 L8 8 L24 40Z" fill={RED} {...line} opacity=".9" />
    <path d="M40 24 L18 14 L26 34Z" fill={YELLOW} />
    <circle cx="42" cy="42" r="12" fill={PAPER} {...line} />
    <circle cx="38" cy="39" r="2.5" fill={INK} opacity=".25" />
    <circle cx="46" cy="46" r="3.5" fill={INK} opacity=".2" />
  </svg>
);
