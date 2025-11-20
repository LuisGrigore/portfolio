import { useCallback, useEffect } from "react";
import {
  getAllProjects,
  getProjectsByTags,
  type GetResourceError,
} from "@services/project.service";
import { useAsyncNew, type AsyncMatch } from "../fp_react/hooks/useAsync";
import type { Project } from "@models/project.model";
import { pipe } from "fp-ts/lib/function";

interface UseProyects {
  matchProjects: <R>(
	  matcher: AsyncMatch<GetResourceError, readonly Project[], R>
	) => R;
  getAllProjects: () => void;
  getProjectsByTag: (tags: string[]) => void;
}

export const useProjects = (): UseProyects => {
  const [matchProjects, runProjectsTask] = useAsyncNew<GetResourceError, readonly Project[]>();

  const getAllProjectsCallback = useCallback(getAllProjects, []);
  const getProjectsByTagCallback = useCallback(getProjectsByTags, []);

  useEffect(() => {
	runProjectsTask(getAllProjectsCallback());
  }, [getAllProjectsCallback]);
  return {
	matchProjects: matchProjects,
	getAllProjects: () => pipe(getAllProjectsCallback(), runProjectsTask),
	getProjectsByTag: (tags: string[]) =>
	  pipe(getProjectsByTagCallback(tags), runProjectsTask),
  };
};
