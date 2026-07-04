interface LoaderProps {
  label?: string;
  className?: string;
}

/** Small inline loading indicator, styled as a blueprint compass spinner. */
export default function Loader({ label = 'Loading…', className = '' }: LoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-16 ${className}`}>
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-line-light border-t-amber-dark"
        aria-hidden="true"
      />
      <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">{label}</span>
    </div>
  );
}
