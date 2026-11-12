import { AnimatePresence, motion } from 'framer-motion';
import BrandIcon from './BrandIcons';
import { initialsOf } from '../data/team';
import { easeOut } from './Reveal';

const socialOrder = ['linkedin', 'github', 'instagram'];
const socialLabel = { linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram' };

export function Avatar({ member, className = '', textClassName = '' }) {
  if (member.photo) {
    return <img src={member.photo} alt="" loading="lazy" className={`size-full rounded-full object-cover ${className}`} />;
  }
  return (
    <span className={`grid size-full place-items-center rounded-full font-semibold tracking-wide ${className} ${textClassName}`}>
      {initialsOf(member.name)}
    </span>
  );
}

/** Profile panel shown for the active member of a dial. */
export default function TeamMember({ member, dialTitle }) {
  const socials = socialOrder.filter((key) => member.socials?.[key]);

  return (
    <div className="relative min-h-[300px] rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-7" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={member.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <div className="flex items-center gap-4">
            <div className="relative size-20 shrink-0">
              <Avatar member={member} className="border border-line bg-accent-soft text-ink" textClassName="text-xl" />
              {!member.photo && (
                <span className="label absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-1.5 py-0.5 text-[0.55rem] text-muted">
                  Photo TBA
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="label text-muted">{dialTitle}</p>
              <h4 className="mt-1 text-xl font-semibold leading-snug text-ink">{member.name}</h4>
            </div>
          </div>

          <p className="label mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-accent-ink">
            {member.role}
          </p>

          <p className={`mt-5 leading-relaxed ${member.bio ? 'text-ink-soft' : 'text-muted italic'}`}>
            {member.bio ?? 'Bio coming soon — this member’s short introduction will appear here.'}
          </p>

          <div className="mt-6 border-t border-line-soft pt-5">
            {socials.length ? (
              <ul className="flex gap-2">
                {socials.map((key) => (
                  <li key={key}>
                    <motion.a
                      href={member.socials[key]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on ${socialLabel[key]}`}
                      className="grid size-10 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent-ink"
                      whileHover={{ y: -2 }}
                    >
                      <BrandIcon name={key} size={17} />
                    </motion.a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label text-muted">Profile links coming soon</p>
            )}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
