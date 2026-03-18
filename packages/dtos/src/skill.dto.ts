import * as t from "io-ts";

export const SkillDTOValidationSchema = t.type({
  id: t.string,
  title: t.string,
  level: t.number,
  tags: t.array(t.string)
});

export const SkillDTOsValidationSchema = t.array(SkillDTOValidationSchema);

export type SkillDTO = t.TypeOf<typeof SkillDTOValidationSchema>;
