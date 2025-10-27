import { ProjectDTO } from "../../../packages/dtos/src/project.dto";
import { IProject } from "../models/project.model";

export function toProjectDTO(project: IProject): ProjectDTO {
  return {
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    tags: project.tags,
    github_url: project.github_url,
    demo_url: project.demo_url,
  };
}
