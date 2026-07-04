interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
}

/**
 * Drafting-sheet style section title: "FIG. 02 — SKILLS MATRIX"
 * followed by a hairline rule. `index` is the two-digit figure number.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = 'light',
}: SectionHeadingProps) {
  const isDark = tone === 'dark';
  return (
    <div className="mb-10 sm:mb-14">
      <div
        className={`mb-3 flex items-center gap-3 font-mono text-xs tracking-widest uppercase ${
          isDark ? 'text-amber' : 'text-amber-dark'
        }`}
      >
        {/* <span>FIG. {index}</span> */}
        <span className={isDark ? 'text-paper/30' : 'text-ink/20'}>/</span>
        <span className={isDark ? 'text-paper/60' : 'text-ink-soft'}>{eyebrow}</span>
        <span className={isDark ? 'text-paper/30' : 'text-ink/20'}>/</span>
      </div>
      <h2
        className={`text-balance text-3xl font-semibold sm:text-4xl ${
          isDark ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 max-w-2xl text-base ${isDark ? 'text-paper/70' : 'text-ink-soft'}`}>
          {description}
        </p>
      )}
      <div className={`mt-6 h-px w-full ${isDark ? 'bg-line-dark' : 'bg-line-light'}`} />
    </div>
  );
}
