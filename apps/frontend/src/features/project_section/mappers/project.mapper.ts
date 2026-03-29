import type { ProjectDTO, ProjectsPageDTO } from "@portfolio/dtos";
import type { Project, ProjectsPage } from "../models/Project.model";

export const toProject = (projectDTO: ProjectDTO): Project => ({
  id: projectDTO.id,
  title: projectDTO.title,
  description: projectDTO.description,
  imageUrl: projectDTO.image_url,
  tags: projectDTO.tags,
  githubUrl: projectDTO.github_url,
  readmeUrl: projectDTO.readme_url,
  demoUrl: projectDTO.demo_url,
});

export const toProjectsPage = (
  projectsPageDTO: ProjectsPageDTO,
): ProjectsPage => ({
  projects: projectsPageDTO.projects.map((projectDTO) => toProject(projectDTO)),
  totalPages: projectsPageDTO.total_pages,
  currentPage: projectsPageDTO.current_page,
});
