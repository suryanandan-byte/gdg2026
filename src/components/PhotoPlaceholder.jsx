import { ImageIcon } from 'lucide-react';

/** Clearly-marked slot for a real photograph. Pass `src` once one exists. */
export default function PhotoPlaceholder({ src, alt = '', caption, className = '' }) {
  return (
    <figure className={className}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="size-full rounded-2xl object-cover" />
      ) : (
        <div className="grid size-full place-items-center rounded-2xl border border-dashed border-line bg-paper-deep/60 text-muted">
          <div className="flex flex-col items-center gap-2 px-6 text-center">
            <ImageIcon size={22} aria-hidden />
            <span className="label text-[0.62rem]">Photo to be added</span>
          </div>
        </div>
      )}
      {caption && <figcaption className="label mt-3 text-muted">{caption}</figcaption>}
    </figure>
  );
}
