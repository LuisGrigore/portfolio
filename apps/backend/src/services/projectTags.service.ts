import { connectDB } from "../db.js";
import { IProjectTag, ProjectTag } from "../models/projectTag.model.js";
import { toProjectDTO } from "../mappers/projectTag.mapper.js";
import { TagDTO } from "@portfolio/dtos";

export async function getAllProjectTags(): Promise<TagDTO[]> {
  await connectDB();
  const projectTags: IProjectTag[] = await ProjectTag.find({
    isActive: true,
  }).sort({ tag: 1 });
  return projectTags.map(toProjectDTO);
}
