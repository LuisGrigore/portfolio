import { useCallback, useEffect } from "react";
import {
  getAllProjects,
  getAllProjectTags,
  getProjectsByTags,
  type GetResourceError,
} from "@services/project.service";
import { useAsync, type AsyncState } from "../../fp_react/hooks/useAsync";
import type { Project } from "@models/project.model";
import { pipe } from "fp-ts/lib/function";
import type { ProjectTag } from "@models/projectTag.model";

interface UseProyectSection {
  projects: AsyncState<GetResourceError, readonly Project[]>;
  tags: AsyncState<GetResourceError, readonly ProjectTag[]>;
  getAllProjects: () => void;
  getProjectsByTag: (tags: string[]) => void;
}

export const useProjectSection = (): UseProyectSection => {
  const [projects, runProjectsTask] = useAsync<GetResourceError, readonly Project[]>();
  const [tags, runTagsTask] = useAsync<GetResourceError, readonly ProjectTag[]>();

  const getAllProjectsCallback = useCallback(getAllProjects, []);

  const getProjectsByTagCallback = useCallback(getProjectsByTags, []);
  const getAllProjectTagsCallback = useCallback(getAllProjectTags, []);

  useEffect(() => {
    runProjectsTask(getAllProjectsCallback());
	runTagsTask(getAllProjectTagsCallback());
  }, [getAllProjectsCallback,getAllProjectTagsCallback]);
  return {
    projects: projects,
	tags: tags,
    getAllProjects: () => pipe(getAllProjectsCallback(), runProjectsTask),
    getProjectsByTag: (tags: string[]) =>
      pipe(getProjectsByTagCallback(tags), runProjectsTask),
  };
};
