import type { TagDTO } from "@portfolio/dtos";
import {
  type TagFilter,
} from "@shared/models/TagFilter.model";

export const toTagFilter = (dto: TagDTO): TagFilter => ({
  id: dto.id,
  label: dto.tag,
});
