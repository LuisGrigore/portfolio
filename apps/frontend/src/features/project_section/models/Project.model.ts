import type { ProjectDTO } from "@portfolio/dtos";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export const ProjectFactory = {
  create: (
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    tags: string[],
    githubUrl?: string,
    demoUrl?: string
  ): Project => ({
    id: id,
    title: title,
    description: description,
    imageUrl: imageUrl,
    tags: tags,
    githubUrl: githubUrl,
    demoUrl: demoUrl,
  }),
  fromProjectDTO: (projectDTO: ProjectDTO) => ({
    id: projectDTO.id,
    title: projectDTO.title,
    description: projectDTO.description,
    imageUrl: projectDTO.image_url,
    tags: projectDTO.tags,
    githubUrl: projectDTO.github_url,
    demoUrl: projectDTO.demo_url,
  }),
};
