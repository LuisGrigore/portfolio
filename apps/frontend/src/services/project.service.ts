import  { ProjectsDTOArrayValidationSchema } from "@portfolio/dtos";
import { mapProjectData } from "../mappers/project.mapper";
import type { Project } from "../models/project.model";
import * as TE from "fp-ts/lib/TaskEither";
import { fpFetchJson, type FetchParseError } from "../fp_react/fetch/fpFetchJson";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

const apiUrl = import.meta.env.VITE_API_URL;

export type GetAllError = FetchParseError | t.Errors;

export const getAllProjects = (): TE.TaskEither<GetAllError, Project[]> =>
  pipe(
    fpFetchJson<unknown[]>(`${apiUrl}/getProjects`),
    TE.chain((data) =>
      pipe(
        TE.fromEither(ProjectsDTOArrayValidationSchema.decode(data)),
        TE.mapLeft((errors) => errors as GetAllError)
      )
    ),
	TE.map((projectDtos) => projectDtos.map(mapProjectData))
  );
