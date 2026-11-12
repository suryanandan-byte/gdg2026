import { useEffect, useState } from 'react';

/**
 * Returns the id of the section the reader is currently in: the last section
 * whose top has passed 40% of the viewport height. At the very bottom of the
 * page the final section wins, even if it is too short to reach that line.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = ids[0];
      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActive(current);
    };
    // Cheap enough to run directly: five rect reads, and React skips
    // re-renders when the active id hasn't changed.
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}
