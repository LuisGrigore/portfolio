import { TagDTO } from "@portfolio/dtos";
import { IProjectTag } from "../models/projectTag.model.js";

export function toProjectDTO(projectTag: IProjectTag): TagDTO {
  return {
	id: projectTag.id,
	tag: projectTag.tag,
  };
}