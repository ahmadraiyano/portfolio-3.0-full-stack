import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden border border-line-light bg-white transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded bg-navy-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
          Project {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {project.description}
        </p>

        {Array.isArray(project.techStack) && project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line-light px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-amber-dark">
          View Details
          <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
