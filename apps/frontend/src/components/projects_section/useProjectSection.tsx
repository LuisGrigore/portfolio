import { useEffect, useMemo } from "react";
import { getAllProjects, type GetAllError } from "@services/project.service";
import {
  useAsync,
  type AsyncState,
} from "../../fp_react/hooks/useAsync";
import type { Project } from "@models/project.model";

interface UseProyectSection {
  projects: AsyncState<GetAllError, readonly Project[]>;
  getAllProjects: () => void;
  getProjectsByTag: (tag: string) => void;
}

export const useProjectSection = (): UseProyectSection => {
  const [projects, runTask] = useAsync<GetAllError, readonly Project[]>();
  const getAllProjectsMemoTask = useMemo(
    () => getAllProjects(),
    []
  );
  const getProjectsByTagMemoTask = useMemo(
    () => getAllProjects(),
    []
  );
  useEffect(() => {
    runTask(getAllProjectsMemoTask);
  }, [getAllProjectsMemoTask]);
  return {
    projects: projects,
    getAllProjects: () => runTask(getAllProjectsMemoTask),
    getProjectsByTag: (tag: string) => runTask(getProjectsByTagMemoTask),
  };
};
