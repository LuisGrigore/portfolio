import { getResourceFromEndpoint, type BackoffConfig } from "@shared/fp_react";
import { type TagFilter } from "@shared/models/TagFilter.model";
import { toSkill } from "../mappers/skill.mapper";
import {
  SkillDTOsValidationSchema,
  TagDTOsValidationSchema,
  type TagDTO,
} from "@portfolio/dtos";
import { toTagFilter } from "@shared/mappers/tag_filter.mapper";

const apiUrl = import.meta.env.VITE_API_URL;

const defaultBackoffConfig: BackoffConfig = {
  retries: 1,
  delay: 500,
  factor: 2,
};

export const getAllSkills = () =>
  getResourceFromEndpoint(
    `${apiUrl}/skills`,
    SkillDTOsValidationSchema,
    (skillDtos) => skillDtos.map(toSkill),
    defaultBackoffConfig,
  );

export const getSkillsByTags = (tags: TagFilter[]) =>
  getResourceFromEndpoint(
    `${apiUrl}/skills?tags=${encodeURIComponent(
      tags.map((tag) => tag.id).join(","),
    )}`,
    SkillDTOsValidationSchema,
    (skillDtos) => skillDtos.map(toSkill),
    defaultBackoffConfig,
  );

export const getAllSkillTags = () =>
  getResourceFromEndpoint(
    `${apiUrl}/skillsTags`,
    TagDTOsValidationSchema,
    (projectTagDtos: TagDTO[]): TagFilter[] => projectTagDtos.map(toTagFilter),
    defaultBackoffConfig,
  );
