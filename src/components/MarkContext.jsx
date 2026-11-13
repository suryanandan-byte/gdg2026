import { createContext, useContext, useState } from 'react';

/**
 * Tracks whether the big G·D·G hero mark is on screen.
 * When it isn't, the navbar shows the small three-dot mark; both share
 * Framer Motion layoutIds so the circles morph between the two positions.
 */
const MarkContext = createContext({ heroActive: false, setHeroActive: () => {} });

export function MarkProvider({ children }) {
  const [heroActive, setHeroActive] = useState(true);
  return <MarkContext.Provider value={{ heroActive, setHeroActive }}>{children}</MarkContext.Provider>;
}

export const useMark = () => useContext(MarkContext);

export const MARK_COLORS = ['#4285F4', '#EA4335', '#34A853'];
export const MARK_LETTERS = ['G', 'D', 'G'];
export const markSpring = { type: 'spring', stiffness: 170, damping: 22, mass: 0.9 };

/** Hero background — Google Yellow, fades into the paper colour on scroll. */
export const HERO_BG = '#FBBC04';
