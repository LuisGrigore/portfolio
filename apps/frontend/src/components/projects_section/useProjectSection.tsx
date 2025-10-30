import { useMemo } from "react";
import { getAllProjects, type GetAllError } from "@services/project.service";
import { useAsyncOnce, type AsyncState } from "../../fp_react/hooks/useAsync";
import { pipe } from "fp-ts/lib/function";
import type { Project } from "@models/project.model";
import { retryTaskEither } from "../../fp_react/async_utils/retryTaskEither";

interface UseProyectSection {
  projects: AsyncState<GetAllError, readonly Project[]>;
}

export const useProjectSection = (): UseProyectSection => {
  return {
    projects: pipe(
      useMemo(() => retryTaskEither(getAllProjects(), 5, 1000), []),
      useAsyncOnce
    ),
  };
};
