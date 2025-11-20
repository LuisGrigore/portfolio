import { useCallback, useEffect } from "react";
import {
  getAllProjects,
  getProjectsByTags,
  type GetResourceError,
} from "@services/project.service";
import { useAsync, type AsyncState } from "../../fp_react/hooks/useAsync";
import type { Project } from "@models/project.model";
import { pipe } from "fp-ts/lib/function";

interface UseProyectSection {
  projects: AsyncState<GetResourceError, readonly Project[]>;
  getAllProjects: () => void;
  getProjectsByTag: (tags: string[]) => void;
}

export const useProjectSection = (): UseProyectSection => {
  const [projects, runProjectsTask] = useAsync<GetResourceError, readonly Project[]>();

  const getAllProjectsCallback = useCallback(getAllProjects, []);

  const getProjectsByTagCallback = useCallback(getProjectsByTags, []);

  useEffect(() => {
    runProjectsTask(getAllProjectsCallback());
  }, [getAllProjectsCallback]);
  return {
    projects: projects,
    getAllProjects: () => pipe(getAllProjectsCallback(), runProjectsTask),
    getProjectsByTag: (tags: string[]) =>
      pipe(getProjectsByTagCallback(tags), runProjectsTask),
  };
};
