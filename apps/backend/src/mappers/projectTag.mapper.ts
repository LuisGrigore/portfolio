import { ProjectTagDTO } from "@portfolio/dtos/src/projectTag.dto.js";
import { IProjectTag } from "../models/projectTag.model.js";

export function toProjectDTO(projectTag: IProjectTag): ProjectTagDTO {
  return {
	id: projectTag.id,
	tag: projectTag.tag,
  };
}