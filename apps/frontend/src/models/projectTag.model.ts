import type { ProjectTagDTO } from "@portfolio/dtos";

export type TagFilter = {
  id: string;
  label: string;
};

export const TagFilterFactory = {
  create: (id: string, label: string): TagFilter => ({ id, label }),
  fromProjectTagDTO: (dto:ProjectTagDTO): TagFilter => TagFilterFactory.create(dto.id, dto.tag),
};
