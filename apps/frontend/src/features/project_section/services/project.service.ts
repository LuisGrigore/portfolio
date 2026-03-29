import {
  ProjectsPageDTOValidationSchema,
  TagDTOsValidationSchema,
  type TagDTO,
} from "@portfolio/dtos";
import { fpFetchJson, getResourceFromEndpoint } from "@shared/fp_react";
import type { BackoffConfig } from "@shared/fp_react";
import {
  TagFilterFactory,
  type TagFilter,
} from "@shared/models/TagFilter.model";
import { ProjectPageFactory, type Project } from "../models/Project.model";

import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/function";

const apiUrl = import.meta.env.VITE_API_URL;

const defaultBackoffConfig: BackoffConfig = {
  retries: 1,
  delay: 500,
  factor: 2,
};

export const getProjectsByTags = (tags: TagFilter[], page: number) =>
  getResourceFromEndpoint(
    `${apiUrl}/projects?tags=${encodeURIComponent(
      tags.map((tag) => tag.id).join(","),
    )}&page=${page}`,
    ProjectsPageDTOValidationSchema,
    ProjectPageFactory.fromProjectPageDTO,
    defaultBackoffConfig,
  );

export const getAllProjectTags = () =>
  getResourceFromEndpoint(
    `${apiUrl}/projectTags`,
    TagDTOsValidationSchema,
    (projectTagDtos: TagDTO[]): TagFilter[] =>
      projectTagDtos.map(TagFilterFactory.fromTagDTO),
    defaultBackoffConfig,
  );

export const getProjectDetails = (project: Project) =>
  !project.readmeUrl
    ? TE.right(project.description)
    : pipe(
        fpFetchJson<{ content: string }>(project.readmeUrl),
        TE.map((data) =>
          new TextDecoder().decode(
            Uint8Array.from(atob(data.content), (c) => c.charCodeAt(0)),
          ),
        ),
      );
