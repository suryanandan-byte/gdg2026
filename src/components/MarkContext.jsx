import { createContext, useContext, useState } from 'react';

/**
 * Shared hero state.
 * - heroActive: whether the big G·D·G mark is on screen. When it isn't, the
 *   navbar shows the small three-dot mark; both share Framer Motion layoutIds
 *   so the circles morph between the two positions.
 * - heroDark: whether the dark hero is still behind the navbar, so the navbar
 *   can switch to light text.
 */
const MarkContext = createContext({
  heroActive: false,
  setHeroActive: () => {},
  heroDark: false,
  setHeroDark: () => {},
});

export function MarkProvider({ children }) {
  const [heroActive, setHeroActive] = useState(true);
  const [heroDark, setHeroDark] = useState(true);
  return (
    <MarkContext.Provider value={{ heroActive, setHeroActive, heroDark, setHeroDark }}>{children}</MarkContext.Provider>
  );
}

export const useMark = () => useContext(MarkContext);

export const MARK_COLORS = ['#4285F4', '#EA4335', '#34A853'];
export const MARK_LETTERS = ['G', 'D', 'G'];
export const markSpring = { type: 'spring', stiffness: 170, damping: 22, mass: 0.9 };

/** Warm near-black used for the hero. */
export const HERO_DARK = '#161513';
