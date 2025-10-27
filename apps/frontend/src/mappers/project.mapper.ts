import type { ProjectDTO } from '@portfolio/dtos';
import type { Project } from 'models/project.model';

export function mapProjectData(projectDto: ProjectDTO):Project {
  return {
	id: projectDto.id,
	title: projectDto.title,
	description: projectDto.description,
	imageUrl: projectDto.image_url,
	tags: projectDto.tags,
	githubUrl: projectDto.github_url,
	demoUrl: projectDto.demo_url,
  };
}