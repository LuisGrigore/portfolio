import { ProjectDTO } from "@portfolio/dtos/src/project.dto.js";
import { IProject } from "../models/project.model.js";

export function toProjectDTO(project: IProject): ProjectDTO {
  return {
    id: "project._id.toString()",
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    tags: project.tags,
    github_url: project.github_url,
    demo_url: project.demo_url,
  };
}
