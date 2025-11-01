import * as t from "io-ts";

export const ProjectDTOValidationSchema = t.intersection([
  t.type({
    id: t.string,
    title: t.string,
    description: t.string,
    image_url: t.string,
    tags: t.array(t.string),
  }),
  t.partial({
    github_url: t.string,
    demo_url: t.string,
  }),
]);

export const ProjectDTOsValidationSchema = t.array(ProjectDTOValidationSchema); 

export type ProjectDTO = t.TypeOf<typeof ProjectDTOValidationSchema>;
