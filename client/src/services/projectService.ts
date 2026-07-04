import axiosInstance from './axiosInstance';
import type { ApiEnvelope, Project, ProjectInput } from '@/types';

/** Public: list all projects (optionally only featured ones). */
export const getProjects = async (opts: { featured?: boolean } = {}): Promise<Project[]> => {
  const { data } = await axiosInstance.get<ApiEnvelope<Project[]>>('/projects', {
    params: opts.featured ? { featured: true } : undefined,
  });
  return data.data;
};

/**
 * Public: single project lookup. The backend accepts either the slug
 * (used on the public project details page) or the id (used by the
 * admin edit form), so this one function covers both.
 */
export const getProjectBySlug = async (slugOrId: string): Promise<Project> => {
  const { data } = await axiosInstance.get<ApiEnvelope<Project>>(`/projects/${slugOrId}`);
  return data.data;
};

export const getProjectById = getProjectBySlug;

/** Admin only (JWT required): create a project. */
export const createProject = async (payload: ProjectInput): Promise<Project> => {
  const { data } = await axiosInstance.post<ApiEnvelope<Project>>('/projects', payload);
  return data.data;
};

/** Admin only (JWT required): update a project. */
export const updateProject = async (id: string, payload: Partial<ProjectInput>): Promise<Project> => {
  const { data } = await axiosInstance.put<ApiEnvelope<Project>>(`/projects/${id}`, payload);
  return data.data;
};

/** Admin only (JWT required): delete a project. */
export const deleteProject = async (id: string): Promise<null> => {
  const { data } = await axiosInstance.delete<ApiEnvelope<null>>(`/projects/${id}`);
  return data.data;
};
