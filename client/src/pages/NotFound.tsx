import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-dark">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Page not found</h1>
        <p className="mt-3 max-w-md text-sm text-ink-soft">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Button to="/" variant="primary" className="mt-8">
          Back to home
        </Button>
      </div>
    </MainLayout>
  );
}
