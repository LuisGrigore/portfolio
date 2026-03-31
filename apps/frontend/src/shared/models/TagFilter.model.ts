// import type { TagDTO } from "@portfolio/dtos";

export type TagFilter = {
  id: string;
  label: string;
};

// export const TagFilterFactory = {
//   create: (id: string, label: string): TagFilter => ({ id, label }),
//   fromTagDTO: (dto:TagDTO): TagFilter => TagFilterFactory.create(dto.id, dto.tag),
// };
