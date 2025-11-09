import { ProjectDTOsValidationSchema } from "@portfolio/dtos";
import { ProjectTagDTOsValidationSchema } from "@portfolio/dtos";
import { mapProjectData } from "../mappers/project.mapper";
import type { Project } from "../models/project.model";
import * as TE from "fp-ts/lib/TaskEither";
import {
  fpFetchJson,
  type FetchParseError,
} from "../fp_react/fetch/fpFetchJson";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";
import { taskEitherWithBackoff } from "../fp_react/async_utils/retryTaskEither";
import type { ProjectTag } from "@models/projectTag.model";

const apiUrl = import.meta.env.VITE_API_URL;

export type GetResourceError = FetchParseError | t.Errors;

const getProjectsFromEndpoint = (
  url: string
): TE.TaskEither<GetResourceError, readonly Project[]> =>
  taskEitherWithBackoff(
    pipe(
      fpFetchJson<unknown[]>(url),
      TE.chain((data) =>
        pipe(
          TE.fromEither(ProjectDTOsValidationSchema.decode(data)),
          TE.mapLeft((errors) => errors as GetResourceError)
        )
      ),
      TE.map((projectDtos) => projectDtos.map(mapProjectData))
    ),
    3,
    500,
    2
  );

export const getAllProjects = () =>
  getProjectsFromEndpoint(`${apiUrl}/projects`);

export const getProjectsByTags = (tags: string[]) =>
  getProjectsFromEndpoint(
    `${apiUrl}/projects?tags=${encodeURIComponent(tags.join(","))}`
  );

export const getAllProjectTags = (): TE.TaskEither<
  GetResourceError,
  readonly ProjectTag[]
> =>
  taskEitherWithBackoff(
    pipe(
      fpFetchJson<unknown[]>(`${apiUrl}/projectTags`),
      TE.chain((data) =>
        pipe(
          TE.fromEither(ProjectTagDTOsValidationSchema.decode(data)),
          TE.mapLeft((errors) => errors as GetResourceError)
        )
      ),
      TE.map((projectTagDtos) =>
        projectTagDtos.map(
          (dto) => ({ id: dto.id, tag: dto.tag } as ProjectTag)
        )
      )
    ),
    3,
    500,
    2
  );
