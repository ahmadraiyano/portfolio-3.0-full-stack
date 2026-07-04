import { z } from 'zod';

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const createProjectSchema = z.object({
  title: z.string().trim().min(2, 'Title is too short').max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugPattern, 'Slug must be lowercase, hyphen-separated (e.g. my-project)'),
  description: z.string().trim().min(10, 'Description is too short').max(1000),
  techStack: z.array(z.string().trim().min(1)).default([]),
  image: z.string().trim().url('Image must be a valid URL'),
  liveLink: z.string().trim().url().optional().or(z.literal('')),
  githubLink: z.string().trim().url().optional().or(z.literal('')),
  challenges: z.string().trim().max(2000).optional().or(z.literal('')),
  futurePlans: z.string().trim().max(2000).optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
});

// All fields optional on update — only send what changed.
export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
