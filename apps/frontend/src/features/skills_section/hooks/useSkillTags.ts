import { useAsync, type AsyncMatch, type GetResourceError } from "@shared/fp_react";
import type { TagFilter } from "@shared/models/TagFilter.model";
import { useCallback, useEffect } from "react";
import { getAllSkillTags } from "../services/skill.service";

interface UseSkillTags {
  matchTags: <R>(
    matcher: AsyncMatch<GetResourceError, readonly TagFilter[], R>
  ) => R;
}

export const useSkillTags = (): UseSkillTags => {
  const [matchTags, runTagsTask] = useAsync<
    GetResourceError,
    readonly TagFilter[]
  >();

  const getAllSkillTagsCallback = useCallback(getAllSkillTags, []);

  useEffect(() => {
    runTagsTask(getAllSkillTagsCallback());
  }, [getAllSkillTagsCallback]);
  return { matchTags };
};
