import { SkillDTO } from "@portfolio/dtos";
import { connectDB } from "../db.js";
import { ISkill, Skill } from "../models/skill.model.js";
import { toSkillDTO } from "../mappers/skill.mapper.js";

interface IGetSkillQueryResult {
  _id: string;
  title: string;
  tags: { tag: string }[];
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllSkills(): Promise<SkillDTO[]> {
  await connectDB();

  const skills: IGetSkillQueryResult[] = await Skill.find()
    .sort({ createdAt: -1 })
    .populate<{ tags: { tag: string }[] }>({
      path: "tags",
      match: { isActive: true },
      select: "tag",
    })
    .lean<IGetSkillQueryResult[]>();

  return skills.map((skill) => ({
    id: skill._id.toString(),
    title: skill.title,
    level: skill.level,
    tags: skill.tags.map((t) => t.tag),
  }));
}

export async function createSkill(data: Partial<ISkill>): Promise<SkillDTO> {
  await connectDB();
  const project = new Skill(data);
  const savedProject = await project.save();
  return toSkillDTO(savedProject);
}
