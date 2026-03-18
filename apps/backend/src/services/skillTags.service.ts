import { TagDTO } from "@portfolio/dtos";
import { connectDB } from "../db.js";
import { ISkillTag, SkillTag } from "../models/skillTag.model.js";
import { toTagDTO } from "../mappers/skillTag.mapper.js";


export async function getAllSkillTags(): Promise<TagDTO[]> {
  await connectDB();
  const projectTags: ISkillTag[] = await SkillTag.find({
    isActive: true,
  }).sort({ tag: 1 });
  return projectTags.map(toTagDTO);
}
