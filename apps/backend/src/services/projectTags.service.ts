import { connectDB } from "../db.js";
import { IProjectTag, ProjectTag } from "../models/projectTag.model.js";
import { toProjectDTO } from "../mappers/projectTag.mapper.js";
import { ProjectTagDTO } from "@portfolio/dtos/src/projectTag.dto.js";

export async function getAllProjectTags(): Promise<ProjectTagDTO[]> {
  await connectDB();
  const projectTags: IProjectTag[] = await ProjectTag.find({
    isActive: true,
  }).sort({ tag: 1 });
  return projectTags.map(toProjectDTO);
}
