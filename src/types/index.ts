import { ComponentType } from 'react';

export interface Skill {
  [category: string]: string[];
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  apiUrl?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  github: string;
  linkedin: string;
  email: string;
}

export interface SocialLink {
  icon: ComponentType;
  href: string;
  label: string;
}
