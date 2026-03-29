import { useCallback, useEffect } from "react";
import { getProjectsByTags } from "../services/project.service";
import {
  useAsync,
  type AsyncMatch,
  type GetResourceError,
} from "@shared/fp_react";
import type { ProjectPage } from "../models/Project.model";
import { pipe } from "fp-ts/lib/function";
import type { TagFilter } from "../../../shared/models/TagFilter.model";

interface UseProyects {
  matchProjects: <R>(
    matcher: AsyncMatch<GetResourceError, ProjectPage, R>,
  ) => R;
  getProjectsByTag: (tags: TagFilter[], page: number) => void;
}

export const useProjects = (): UseProyects => {
  const [matchProjects, runProjectsTask] = useAsync<
    GetResourceError,
    ProjectPage
  >();

  const getProjectsByTagCallback = useCallback(getProjectsByTags, []);

  useEffect(() => {
    runProjectsTask(getProjectsByTagCallback([], 1));
  }, [getProjectsByTagCallback]);
  return {
    matchProjects: matchProjects,
    getProjectsByTag: (tags: TagFilter[], page: number) =>
      pipe(getProjectsByTagCallback(tags, page), runProjectsTask),
  };
};
