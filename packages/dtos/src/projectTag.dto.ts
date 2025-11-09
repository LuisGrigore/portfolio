import * as t from "io-ts";

export const ProjectTagDTOValidationSchema = t.type({
  id: t.string,
  tag: t.string,
});

export const ProjectTagDTOsValidationSchema = t.array(
  ProjectTagDTOValidationSchema
);

export type ProjectTagDTO = t.TypeOf<typeof ProjectTagDTOValidationSchema>;
