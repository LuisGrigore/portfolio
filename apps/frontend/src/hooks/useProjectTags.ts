import type { TagFilter } from "@models/projectTag.model";
import {
  getAllProjectTags,
  type GetResourceError,
} from "@services/project.service";
import { useAsyncNew, type AsyncMatch } from "../fp_react/hooks/useAsync";
import { useCallback, useEffect } from "react";

interface UseProjectTags {
  matchTags: <R>(
    matcher: AsyncMatch<GetResourceError, readonly TagFilter[], R>
  ) => R;
}

export const useProjectTags = (): UseProjectTags => {
  const [matchTags, runTagsTask] = useAsyncNew<
    GetResourceError,
    readonly TagFilter[]
  >();

  const getAllProjectTagsCallback = useCallback(getAllProjectTags, []);

  useEffect(() => {
    runTagsTask(getAllProjectTagsCallback());
  }, [getAllProjectTagsCallback]);
  return { matchTags };
};
