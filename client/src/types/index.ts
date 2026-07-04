export interface SocialLink {
  name: string;
  icon: 'Github' | 'Linkedin' | 'FaXTwitter' | 'Facebook';
  url: string;
}

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4;
}

export interface SkillGroup {
  category: string;
  items: Skill[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  result?: string;
  description?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location?: string;
  points: string[];
}

export interface ResumeHighlight {
  label: string;
  value: string;
}

export interface PersonalInfo {
  name: string;
  designation: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  whatsapp?: string;
  availability: string;
  photo: string;
  resumeUrl: string;
  aboutMe: string[];
  resumeHighlights: ResumeHighlight[];
}

/** A project as returned by the API (matches the Prisma Project model). */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  image: string;
  liveLink?: string | null;
  githubLink?: string | null;
  challenges?: string | null;
  futurePlans?: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Shape sent to the API when creating/updating a project. */
export type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface AdminProfile {
  uid: string;
  email: string;
}

export interface ValidationDetail {
  field: string;
  message: string;
}

/** The { success, message, data } envelope every API response uses. */
export interface ApiEnvelope<T> {
  success: boolean;
  statusCode?: number;
  message: string;
  data: T;
  details?: ValidationDetail[];
}
