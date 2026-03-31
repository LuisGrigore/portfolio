import type { SkillDTO } from "@portfolio/dtos";
import type { Skill } from "../models/Skill.model";

export const toSkill = (skillDTO: SkillDTO): Skill => ({
  id: skillDTO.id,
  title: skillDTO.title,
  level: skillDTO.level,
  tags: skillDTO.tags,
});
