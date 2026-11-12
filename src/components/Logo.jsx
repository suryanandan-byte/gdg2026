import { siteConfig } from '../data/siteConfig';

/**
 * Renders the official logo file untouched when configured,
 * otherwise a plain text wordmark (never a recreation of the logo).
 */
export default function Logo({ className = '', textClassName = '' }) {
  const { logo, shortName } = siteConfig;
  if (logo.src) {
    return <img src={logo.src} alt={logo.alt} className={`h-7 w-auto ${className}`} />;
  }
  return <span className={`font-display tracking-[-0.01em] ${textClassName}`}>{shortName}</span>;
}
