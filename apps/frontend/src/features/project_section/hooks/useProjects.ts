import { useCallback, useEffect } from "react";
import {
//   getAllProjects,
  getProjectsByTags,
} from "../services/project.service";
import { useAsync, type AsyncMatch, type GetResourceError } from "@shared/fp_react";
import type { Project } from "../models/Project.model";
import { pipe } from "fp-ts/lib/function";
import type { TagFilter } from "../../../shared/models/TagFilter.model";

interface UseProyects {
  matchProjects: <R>(
	  matcher: AsyncMatch<GetResourceError, readonly Project[], R>
	) => R;
  //getAllProjects: () => void;
  getProjectsByTag: (tags: TagFilter[], page:number) => void;
}

export const useProjects = (): UseProyects => {
  const [matchProjects, runProjectsTask] = useAsync<GetResourceError, readonly Project[]>();


  //const getAllProjectsCallback = useCallback(getAllProjects, []);
  const getProjectsByTagCallback = useCallback(getProjectsByTags, []);

  useEffect(() => {
	runProjectsTask(getProjectsByTagCallback([],1)/*getAllProjectsCallback()*/);
  }, [getProjectsByTagCallback/*getAllProjectsCallback*/]);
  return {
	matchProjects: matchProjects,
	//getAllProjects: () => pipe(getAllProjectsCallback(), runProjectsTask),
	getProjectsByTag: (tags: TagFilter[], page:number) =>
	  pipe(getProjectsByTagCallback(tags, page), runProjectsTask),
  };
};
