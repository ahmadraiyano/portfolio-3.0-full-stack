import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Container from '@/components/common/Container';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import { getProjectBySlug } from '@/services/projectService';
import type { Project } from '@/types';

type Status = 'loading' | 'success' | 'error' | 'not-found';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!slug) return;
    let ignore = false;
    setStatus('loading');

    getProjectBySlug(slug)
      .then((data) => {
        if (ignore) return;
        if (!data) {
          setStatus('not-found');
        } else {
          setProject(data);
          setStatus('success');
        }
      })
      .catch((err: Error) => {
        if (ignore) return;
        setStatus(err.message?.includes('404') ? 'not-found' : 'error');
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  return (
    <MainLayout>
      <Container className="py-12 sm:py-16">
        <Link
          to="/"
          state={{ scrollTo: 'projects' }}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-amber-dark"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        {status === 'loading' && <Loader label="Loading project…" />}

        {status === 'error' && (
          <div className="mt-10 border border-dashed border-line-light p-10 text-center font-mono text-sm text-ink-soft">
            Couldn&rsquo;t reach the API right now. Please try again shortly.
          </div>
        )}

        {status === 'not-found' && (
          <div className="mt-10 border border-dashed border-line-light p-10 text-center">
            <p className="font-mono text-sm text-ink-soft">That project doesn&rsquo;t exist.</p>
            <Button to="/" state={{ scrollTo: 'projects' }} variant="secondary" className="mt-6">
              Back to home
            </Button>
          </div>
        )}

        {status === 'success' && project && (
          <article className="mt-8">
            <div className="aspect-[21/9] w-full overflow-hidden border border-line-light bg-navy-800">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {project.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {project.description}
                </p>

                {project.challenges && (
                  <div className="mt-8">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-amber-dark">
                      Challenges
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {project.challenges}
                    </p>
                  </div>
                )}

                {project.futurePlans && (
                  <div className="mt-8">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-amber-dark">
                      Future Improvements
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {project.futurePlans}
                    </p>
                  </div>
                )}
              </div>

              <aside className="h-fit space-y-6 border border-line-light bg-white p-6">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    Tech Stack
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line-light px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 border-t border-line-light pt-5">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center gap-2 rounded-md bg-amber px-4 py-3 font-mono text-xs uppercase tracking-widest text-navy-950 hover:bg-amber-dark"
                    >
                      <ExternalLink size={14} /> Live Project
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center gap-2 rounded-md border border-ink/20 px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink hover:bg-ink/5"
                    >
                      <Github size={14} /> Client Repo
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </article>
        )}
      </Container>
    </MainLayout>
  );
}
