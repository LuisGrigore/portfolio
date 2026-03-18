import { SkillDTO } from "@portfolio/dtos";
import { ISkill } from "../models/skill.model.js";

export function toSkillDTO(skill: ISkill): SkillDTO {
  return {
    id: skill.id,
    title: skill.title,
	tags: skill.tags.map(tag => tag.toString()),
	level: skill.level
  };
}
