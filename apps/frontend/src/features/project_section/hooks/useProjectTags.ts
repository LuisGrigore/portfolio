import type { TagFilter } from "../../../shared/models/TagFilter.model";
import {
  getAllProjectTags,
  type GetResourceError,
} from "../services/project.service";
import { useAsync, type AsyncMatch } from "@shared/fp_react";
import { useCallback, useEffect } from "react";

interface UseProjectTags {
  matchTags: <R>(
    matcher: AsyncMatch<GetResourceError, readonly TagFilter[], R>
  ) => R;
}

export const useProjectTags = (): UseProjectTags => {
  const [matchTags, runTagsTask] = useAsync<
    GetResourceError,
    readonly TagFilter[]
  >();

  const getAllProjectTagsCallback = useCallback(getAllProjectTags, []);

  useEffect(() => {
    runTagsTask(getAllProjectTagsCallback());
  }, [getAllProjectTagsCallback]);
  return { matchTags };
};
