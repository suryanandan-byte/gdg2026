import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import BrandIcon from './BrandIcons';

/** Icon row for the club's socials. Links without a URL render as disabled. */
export default function SocialLinks({ size = 'md', className = '' }) {
  const box = size === 'sm' ? 'size-9' : 'size-11';
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {siteConfig.socials.map((s) => {
        const common = `${box} grid place-items-center rounded-full border border-line bg-surface text-ink-soft`;
        return (
          <li key={s.id}>
            {s.url ? (
              <motion.a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`${common} transition-colors hover:border-accent hover:text-accent-ink`}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <BrandIcon name={s.id} />
              </motion.a>
            ) : (
              <span
                className={`${common} cursor-not-allowed opacity-45`}
                title={`${s.label} — link coming soon`}
                aria-label={`${s.label} (link coming soon)`}
              >
                <BrandIcon name={s.id} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
