import { useState, useCallback, useMemo } from "react";
import { Category, type CategoryFilter, type Skill } from "./types";



interface SkillCategorySelector {
  selectedCategory: CategoryFilter;
  selectCategory: (category: CategoryFilter) => void;
  filterSkills: (skills: Skill[]) => Skill[];
  categories: readonly CategoryFilter[];
}

export const useSkillCategorySelector = (): SkillCategorySelector => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");

  const filterSkills = useCallback(
    (skills: Skill[]) =>
      selectedCategory === "All"
        ? skills
        : skills.filter((skill) => skill.category === selectedCategory),
    [selectedCategory]
  );

  const categories = useMemo<readonly CategoryFilter[]>(
    () => ["All", ...Object.values(Category)] as const,
    []
  );

  const selectCategory = useCallback(
    (category:CategoryFilter) => (setSelectedCategory(categories.find((cat) => cat === category) ?? "All"))
  ,[]);

  return {
    selectedCategory,
    selectCategory,
    filterSkills,
    categories,
  };
};
