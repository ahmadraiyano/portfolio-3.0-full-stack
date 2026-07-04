interface CornerMarksProps {
  tone?: 'light' | 'dark';
}

/**
 * Decorative registration-cross marks, echoing the corner ticks on a
 * drafting sheet. Purely visual — the signature motif of the design.
 */
export default function CornerMarks({ tone = 'light' }: CornerMarksProps) {
  const color = tone === 'dark' ? 'stroke-paper/30' : 'stroke-ink/20';
  const positions = [
    'top-3 left-3',
    'top-3 right-3 rotate-90',
    'bottom-3 left-3 -rotate-90',
    'bottom-3 right-3 rotate-180',
  ];

  return (
    <>
      {positions.map((pos) => (
        <svg
          key={pos}
          viewBox="0 0 20 20"
          className={`pointer-events-none absolute h-4 w-4 ${color} ${pos}`}
          aria-hidden="true"
        >
          <path d="M2 10 L8 10 M10 2 L10 8" strokeWidth="1.5" fill="none" />
        </svg>
      ))}
    </>
  );
}
