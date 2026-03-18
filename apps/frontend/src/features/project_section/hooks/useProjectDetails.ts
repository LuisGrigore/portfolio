import {
  useAsync,
  type AsyncMatch,
  type GetResourceError,
} from "@shared/fp_react";
import { useCallback, useEffect } from "react";
import { getProjectDetails } from "../services/project.service";
import type { Project } from "../models/Project.model";

interface UseProyectDetails {
  matchProjectDetails: <R>(
    matcher: AsyncMatch<GetResourceError, string, R>,
  ) => R;
}

export const useProjectDetails = (project: Project): UseProyectDetails => {
  const [matchProjects, runProjectsTask] = useAsync<GetResourceError, string>();

  const getProjectDetailsCallback = useCallback(getProjectDetails, []);

  useEffect(() => {
    runProjectsTask(getProjectDetailsCallback(project));
  }, [getProjectDetailsCallback]);
  return {
    matchProjectDetails: matchProjects,
  };
};
