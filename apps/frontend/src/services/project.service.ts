import  { ProjectDTOsValidationSchema } from "@portfolio/dtos";
import { mapProjectData } from "../mappers/project.mapper";
import type { Project } from "../models/project.model";
import * as TE from "fp-ts/lib/TaskEither";
import { fpFetchJson, type FetchParseError } from "../fp_react/fetch/fpFetchJson";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";
import { taskEitherWithBackoff } from "../fp_react/async_utils/retryTaskEither";

const apiUrl = import.meta.env.VITE_API_URL;

export type GetProjectsError = FetchParseError | t.Errors;

const getProjectsFromEndpoint = (url:string): TE.TaskEither<GetProjectsError, readonly Project[]> => taskEitherWithBackoff(pipe(
    fpFetchJson<unknown[]>(url),
    TE.chain((data) =>
      pipe(
        TE.fromEither(ProjectDTOsValidationSchema.decode(data)),
        TE.mapLeft((errors) => errors as GetProjectsError)
      )
    ),
	TE.map((projectDtos) => projectDtos.map(mapProjectData))
  ), 3, 500, 2)

export const getAllProjects = () =>
  getProjectsFromEndpoint(`${apiUrl}/getProjects`);

export const getProjectsByTags = (tags:string[]) =>
  getProjectsFromEndpoint(`${apiUrl}/getProjects?tags=${encodeURIComponent(tags.join(","))}`);

