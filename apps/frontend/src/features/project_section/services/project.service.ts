import {
  ProjectDTOsValidationSchema,
  TagDTOsValidationSchema,
  type TagDTO,
} from "@portfolio/dtos";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

import { fpFetchJson, taskEitherWithBackoff } from "@shared/fp_react";
import type { NetworkError, HttpError, ParseError } from "@shared/fp_react";

import {
  TagFilterFactory,
  type TagFilter,
} from "@shared/models/TagFilter.model";

import type { ValidationError } from "@shared/errors/validationErrors";

import { ProjectFactory } from "../models/Project.model";

const apiUrl = import.meta.env.VITE_API_URL;

export type GetResourceError =
  | NetworkError
  | HttpError
  | ParseError
  | ValidationError;

type BackoffConfig = { retries: number; delay: number; factor: number };

export const getResourceFromEndpoint = <A, D>(
  url: string,
  validationSchema: t.Type<D>,
  modelMapper: (dto: D) => A,
  backoffConfig: BackoffConfig
): TE.TaskEither<GetResourceError, A> =>
  taskEitherWithBackoff(
    pipe(
      fpFetchJson(url),
      TE.chain((data) =>
        pipe(
          TE.fromEither(validationSchema.decode(data)),
          TE.mapLeft(
            (error) =>
              ({
                _tag: "ValidationError",
                cause: error,
              } as GetResourceError)
          )
        )
      ),
      TE.map((dto) => modelMapper(dto))
    ),
    backoffConfig.retries,
    backoffConfig.delay,
    backoffConfig.factor
  );

const defaultBackoffConfig: BackoffConfig = {
  retries: 3,
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
      projectTagDtos.map(TagFilterFactory.fromProjectTagDTO),
    defaultBackoffConfig
  );
