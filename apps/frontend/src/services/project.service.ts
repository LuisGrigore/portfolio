import {
  ProjectDTOsValidationSchema,
  type ProjectTagDTO,
} from "@portfolio/dtos";
import { ProjectTagDTOsValidationSchema } from "@portfolio/dtos";
import * as TE from "fp-ts/lib/TaskEither";
import { fpFetchJson } from "../fp_react/fetch/fpFetchJson";
import { pipe } from "fp-ts/function";
import { taskEitherWithBackoff } from "../fp_react/async_utils/retryTaskEither";
import { TagFilterFactory, type TagFilter } from "@models/projectTag.model";
import type { NetworkError, HttpError } from "fp_react/errors/networkErrors";
import type { ParseError } from "fp_react/errors/parseErrors";
import type { ValidationError } from "errors/validationErrors";
import * as t from "io-ts";
import { ProjectFactory } from "@models/project.model";

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
    ProjectTagDTOsValidationSchema,
    (projectTagDtos: ProjectTagDTO[]): TagFilter[] =>
      projectTagDtos.map(TagFilterFactory.fromProjectTagDTO),
    defaultBackoffConfig
  );
