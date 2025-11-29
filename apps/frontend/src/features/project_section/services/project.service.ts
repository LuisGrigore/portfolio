import {
  ProjectDTOsValidationSchema,
  TagDTOsValidationSchema,
  type TagDTO,
} from "@portfolio/dtos";
import { getResourceFromEndpoint } from "@shared/fp_react";
import type { BackoffConfig } from "@shared/fp_react";
import {
  TagFilterFactory,
  type TagFilter,
} from "@shared/models/TagFilter.model";
import { ProjectFactory } from "../models/Project.model";


const apiUrl = import.meta.env.VITE_API_URL;

const defaultBackoffConfig: BackoffConfig = {
  retries: 1,
  delay: 500,
  factor: 2,
};

export const getAllProjects = () =>
  getResourceFromEndpoint(
    `${apiUrl}/projects`,
    ProjectDTOsValidationSchema,
    (projectDtos) => projectDtos.map(ProjectFactory.fromProjectDTO),
    defaultBackoffConfig
  );

export const getProjectsByTags = (tags: TagFilter[]) =>
  getResourceFromEndpoint(
    `${apiUrl}/projects?tags=${encodeURIComponent(
      tags.map((tag) => tag.id).join(",")
    )}`,
    ProjectDTOsValidationSchema,
    (projectDtos) => projectDtos.map(ProjectFactory.fromProjectDTO),
    defaultBackoffConfig
  );

export const getAllProjectTags = () =>
  getResourceFromEndpoint(
    `${apiUrl}/projectTags`,
    TagDTOsValidationSchema,
    (projectTagDtos: TagDTO[]): TagFilter[] =>
      projectTagDtos.map(TagFilterFactory.fromTagDTO),
    defaultBackoffConfig
  );
