import { TagDTO } from "@portfolio/dtos";
import { ISkillTag } from "../models/skillTag.model.js";

export function toTagDTO(projectTag: ISkillTag): TagDTO {
  return {
	id: projectTag.id,
	tag: projectTag.tag,
  };
}