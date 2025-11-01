import { useCallback, useEffect } from "react";
import {
  getAllProjects,
  getProjectsByTags,
  type GetProjectsError,
} from "@services/project.service";
import { useAsync, type AsyncState } from "../../fp_react/hooks/useAsync";
import type { Project } from "@models/project.model";
import { pipe } from "fp-ts/lib/function";

interface UseProyectSection {
  projects: AsyncState<GetProjectsError, readonly Project[]>;
  getAllProjects: () => void;
  getProjectsByTag: (tags: string[]) => void;
}

export const useProjectSection = (): UseProyectSection => {
  const [projects, runTask] = useAsync<GetProjectsError, readonly Project[]>();

  const getAllProjectsCallback = useCallback(getAllProjects, []);

  const getProjectsByTagCallback = useCallback(getProjectsByTags, []);

  useEffect(() => {
    runTask(getAllProjectsCallback());
  }, [getAllProjectsCallback]);
  return {
    projects: projects,
    getAllProjects: () => pipe(getAllProjectsCallback(), runTask),
    getProjectsByTag: (tags: string[]) =>
      pipe(getProjectsByTagCallback(tags), runTask),
  };
};
