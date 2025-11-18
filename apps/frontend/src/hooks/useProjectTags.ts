import type { ProjectTag } from "@models/projectTag.model";
import {
  getAllProjectTags,
  type GetResourceError,
} from "@services/project.service";
import { useAsyncNew } from "../fp_react/hooks/useAsync";
import { useCallback, useEffect } from "react";

export const useProjectTags = () => {
  const [matchTags, runTagsTask] = useAsyncNew<
    GetResourceError,
    readonly ProjectTag[]
  >();

  const getAllProjectTagsCallback = useCallback(getAllProjectTags, []);

  useEffect(()=>{
	runTagsTask(getAllProjectTagsCallback());
  },[getAllProjectTagsCallback])
  return {matchTags};
};
