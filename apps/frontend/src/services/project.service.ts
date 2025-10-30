import  { ProjectsDTOArrayValidationSchema } from "@portfolio/dtos";
import { mapProjectData } from "../mappers/project.mapper";
import type { Project } from "../models/project.model";
import * as TE from "fp-ts/lib/TaskEither";
import { fpFetchJson, type FetchParseError } from "../fp_react/fetch/fpFetchJson";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";
import { taskEitherWithBackoff } from "../fp_react/async_utils/retryTaskEither";

const apiUrl = import.meta.env.VITE_API_URL;

export type GetAllError = FetchParseError | t.Errors;

const getProjectsFromEndpoint = (url:string) => taskEitherWithBackoff(pipe(
    fpFetchJson<unknown[]>(url),
    TE.chain((data) =>
      pipe(
        TE.fromEither(ProjectsDTOArrayValidationSchema.decode(data)),
        TE.mapLeft((errors) => errors as GetAllError)
      )
    ),
	TE.map((projectDtos) => projectDtos.map(mapProjectData))
  ), 3, 500, 2)

export const getAllProjects = (): TE.TaskEither<GetAllError, Project[]> =>
  getProjectsFromEndpoint(`${apiUrl}/getProjects`);

export const getProjectsByTags = (tags:string[]): TE.TaskEither<GetAllError, Project[]> =>
  getProjectsFromEndpoint(`${apiUrl}/getProjects?tags=${encodeURIComponent(tags.join(","))}`);

