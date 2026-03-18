import { ProjectDTO } from "@portfolio/dtos/src/project.dto.js";
import { IProject } from "../models/project.model.js";

export function toProjectDTO(project: IProject): ProjectDTO {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    tags: project.tags.map(tag => tag.toString()),
    github_url: project.github_url,
	readme_url: project.readme_url,
    demo_url: project.demo_url,
  };
}
