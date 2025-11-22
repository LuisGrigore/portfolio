import { useAsync, type AsyncMatch, type GetResourceError } from "@shared/fp_react";
import type { TagFilter } from "@shared/models/TagFilter.model";
import { useCallback, useEffect } from "react";
import { pipe } from "fp-ts/lib/function";
import type { Skill } from "../models/Skill.model";
import { getAllSkills, getSkillsByTags } from "../services/skill.service";

interface UseSkills {
  matchSkills: <R>(
	  matcher: AsyncMatch<GetResourceError, readonly Skill[], R>
	) => R;
  getAllSkills: () => void;
  getSkillsByTag: (tags: TagFilter[]) => void;
}

export const useSkills = (): UseSkills => {
  const [matchSkills, runSkillTask] = useAsync<GetResourceError, readonly Skill[]>();
  
  const getAllSkillsCallback = useCallback(getAllSkills, []);
  const getSkillsByTagCallback = useCallback(getSkillsByTags, []);

  useEffect(() => {
	runSkillTask(getAllSkillsCallback());
  }, [getAllSkillsCallback]);
  return {
	matchSkills: matchSkills,
	getAllSkills: () => pipe(getAllSkillsCallback(), runSkillTask),
	getSkillsByTag: (tags: TagFilter[]) =>
	  pipe(getSkillsByTagCallback(tags), runSkillTask),
  };
}