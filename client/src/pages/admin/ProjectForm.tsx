import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import Container from '@/components/common/Container';
import Loader from '@/components/common/Loader';
import { getProjectById, createProject, updateProject } from '@/services/projectService';

interface ProjectFormState {
  title: string;
  slug: string;
  description: string;
  techStack: string; // comma-separated in the form, split into an array on submit
  image: string;
  liveLink: string;
  githubLink: string;
  challenges: string;
  futurePlans: string;
  featured: boolean;
}

const emptyForm: ProjectFormState = {
  title: '',
  slug: '',
  description: '',
  techStack: '',
  image: '',
  liveLink: '',
  githubLink: '',
  challenges: '',
  futurePlans: '',
  featured: false,
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!isEditing || !id) return;
    getProjectById(id)
      .then((project) => {
        setForm({
          ...emptyForm,
          ...project,
          liveLink: project.liveLink ?? '',
          githubLink: project.githubLink ?? '',
          challenges: project.challenges ?? '',
          futurePlans: project.futurePlans ?? '',
          techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
        });
        setSlugTouched(true);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'title' && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
    if (name === 'slug') setSlugTouched(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing && id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Could not save the project.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container className="max-w-2xl py-10">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {isEditing ? 'Edit project' : 'New project'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Field label="Title">
            <input name="title" required value={form.title} onChange={handleChange} className="input" />
          </Field>

          <Field label="Slug" hint="Used in the project URL, e.g. /projects/your-slug">
            <input name="slug" required value={form.slug} onChange={handleChange} className="input" />
          </Field>

          <Field label="Short description">
            <textarea
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="input resize-none"
            />
          </Field>

          <Field label="Tech stack" hint="Comma-separated, e.g. React, Express, PostgreSQL">
            <input name="techStack" value={form.techStack} onChange={handleChange} className="input" />
          </Field>

          <Field label="Image URL" hint="A hosted image link (e.g. from your GitHub repo or an image host)">
            <input name="image" required value={form.image} onChange={handleChange} className="input" />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Live link">
              <input name="liveLink" value={form.liveLink} onChange={handleChange} className="input" />
            </Field>
            <Field label="GitHub (client) link">
              <input name="githubLink" value={form.githubLink} onChange={handleChange} className="input" />
            </Field>
          </div>

          <Field label="Challenges faced">
            <textarea
              name="challenges"
              rows={3}
              value={form.challenges}
              onChange={handleChange}
              className="input resize-none"
            />
          </Field>

          <Field label="Future improvements">
            <textarea
              name="futurePlans"
              rows={3}
              value={form.futurePlans}
              onChange={handleChange}
              className="input resize-none"
            />
          </Field>

          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Feature on homepage
          </label>

          {error && <p className="font-mono text-xs text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-amber px-5 py-3 font-mono text-xs uppercase tracking-widest text-navy-950 hover:bg-amber-dark disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Project'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="rounded-md border border-line-light px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink-soft hover:bg-paper-dim"
            >
              Cancel
            </button>
          </div>
        </form>
      </Container>
    </AdminLayout>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-ink-soft">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-soft/70">{hint}</p>}
    </div>
  );
}
