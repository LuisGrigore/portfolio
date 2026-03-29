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
	readme_url: t.string,
    demo_url: t.string,
  }),
]);

export const ProjectDTOsValidationSchema = t.array(ProjectDTOValidationSchema); 

export type ProjectDTO = t.TypeOf<typeof ProjectDTOValidationSchema>;

export const ProjectsPageDTOValidationSchema = t.type({
  projects: ProjectDTOsValidationSchema,
  total_pages: t.number,
  current_page: t.number,
  total_items: t.number,
  items_per_page: t.number,
});

export type ProjectsPageDTO = t.TypeOf<typeof ProjectsPageDTOValidationSchema>;