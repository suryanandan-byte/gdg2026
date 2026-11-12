import { motion } from 'framer-motion';

export const easeOut = [0.22, 1, 0.36, 1];

/** The one scroll-reveal used site-wide: fade + slight upward movement, once. */
export default function Reveal({ as = 'div', delay = 0, y = 16, className = '', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
