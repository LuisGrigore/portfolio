import type { ProjectTag } from "@models/projectTag.model";
import {
  getAllProjectTags,
  type GetResourceError,
} from "@services/project.service";
import { useAsyncNew, type AsyncMatch } from "../fp_react/hooks/useAsync";
import { useCallback, useEffect } from "react";

interface UseProjectTags {
  matchTags: <R>(
    matcher: AsyncMatch<GetResourceError, readonly ProjectTag[], R>
  ) => R;
}

export const useProjectTags = (): UseProjectTags => {
  const [matchTags, runTagsTask] = useAsyncNew<
    GetResourceError,
    readonly ProjectTag[]
  >();

  const getAllProjectTagsCallback = useCallback(getAllProjectTags, []);

  useEffect(() => {
    runTagsTask(getAllProjectTagsCallback());
  }, [getAllProjectTagsCallback]);
  return { matchTags };
};
