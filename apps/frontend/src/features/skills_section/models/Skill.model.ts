import type { SkillDTO } from "@portfolio/dtos";

export type Skill = {
  id: string;
  title: string;
  level: number;
  tags: string[];
};

export const SkillFactory = {
  create: (
    id: string,
    title: string,
    level: number,
    tags: string[],
  ): Skill => ({
    id: id,
    title: title,
    level: level,
    tags: tags,
  }),
  fromSkillDTO: (skillDTO: SkillDTO):Skill => ({
    id: skillDTO.id,
    title: skillDTO.title,
    level: skillDTO.level,
    tags: skillDTO.tags,

  }),
};
