import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Mail } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import Container from '@/components/common/Container';
import Loader from '@/components/common/Loader';
import { getProjects, deleteProject } from '@/services/projectService';
import { getMessages } from '@/services/contactService';
import type { ContactMessage, Project } from '@/types';

type Tab = 'projects' | 'messages';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const loadProjects = useCallback(() => getProjects().then(setProjects), []);
  const loadMessages = useCallback(() => getMessages().then(setMessages), []);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadProjects(), loadMessages()]).finally(() => setLoading(false));
  }, [loadProjects, loadMessages]);

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    await deleteProject(project.id);
    setNotice(`Deleted "${project.title}".`);
    loadProjects();
  };

  return (
    <AdminLayout>
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1 border border-line-light bg-white p-1">
            {(
              [
                { id: 'projects', label: `Projects (${projects.length})` },
                { id: 'messages', label: `Messages (${messages.length})` },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  tab === t.id ? 'bg-navy-900 text-amber' : 'text-ink-soft hover:bg-paper-dim'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'projects' && (
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-navy-950 hover:bg-amber-dark"
            >
              <Plus size={14} /> New Project
            </Link>
          )}
        </div>

        {notice && <p className="mb-4 font-mono text-xs text-teal-dark">{notice}</p>}

        {loading ? (
          <Loader />
        ) : tab === 'projects' ? (
          <div className="overflow-hidden border border-line-light bg-white">
            {projects.length === 0 && (
              <p className="p-8 text-center text-sm text-ink-soft">
                No projects yet — add your first one.
              </p>
            )}
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between gap-4 border-b border-line-light p-4 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={project.image}
                    alt=""
                    className="h-12 w-16 rounded object-cover bg-navy-800"
                  />
                  <div>
                    <p className="font-medium text-ink">{project.title}</p>
                    <p className="font-mono text-xs text-ink-soft">/{project.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-line-light text-ink-soft hover:border-amber-dark hover:text-amber-dark"
                    aria-label={`Edit ${project.title}`}
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project)}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-line-light text-ink-soft hover:border-red-400 hover:text-red-500"
                    aria-label={`Delete ${project.title}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden border border-line-light bg-white">
            {messages.length === 0 && (
              <p className="p-8 text-center text-sm text-ink-soft">No messages yet.</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="border-b border-line-light p-4 last:border-b-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{msg.name}</p>
                  <span className="font-mono text-[10px] text-ink-soft">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <a
                  href={`mailto:${msg.email}`}
                  className="mt-0.5 flex items-center gap-1 font-mono text-xs text-amber-dark"
                >
                  <Mail size={12} /> {msg.email}
                </a>
                <p className="mt-2 text-sm text-ink-soft">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </AdminLayout>
  );
}
