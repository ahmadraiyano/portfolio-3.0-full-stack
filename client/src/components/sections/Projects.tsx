import { useEffect, useState } from 'react';
import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import Loader from '@/components/common/Loader';
import ProjectCard from './ProjectCard';
import { getProjects } from '@/services/projectService';
import type { Project } from '@/types';

type Status = 'loading' | 'success' | 'error';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let ignore = false;

    getProjects()
      .then((data) => {
        if (!ignore) {
          setProjects(data);
          setStatus('success');
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error');
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="projects" className="scroll-mt-20 bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Selected Work"
          title="Projects"
          description="A few projects that show how I take an idea from schema to shipped UI."
        />

        {status === 'loading' && <Loader label="Loading projects…" />}

        {status === 'error' && (
          <div className="border border-dashed border-line-light p-10 text-center">
            <p className="font-mono text-sm text-ink-soft">
              Couldn&rsquo;t reach the API. Make sure the backend server is running and
              <code className="mx-1 rounded bg-paper-dim px-1.5 py-0.5">VITE_API_BASE_URL</code>
              points to it — see the project README.
            </p>
          </div>
        )}

        {status === 'success' && projects.length === 0 && (
          <div className="border border-dashed border-line-light p-10 text-center">
            <p className="font-mono text-sm text-ink-soft">
              No projects yet. Add one from the admin dashboard or run{' '}
              <code className="rounded bg-paper-dim px-1.5 py-0.5">npm run seed</code> in{' '}
              <code className="rounded bg-paper-dim px-1.5 py-0.5">/server</code>.
            </p>
          </div>
        )}

        {status === 'success' && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
