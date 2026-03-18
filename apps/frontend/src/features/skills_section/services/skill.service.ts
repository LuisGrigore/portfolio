// import type { TagDTO } from "@portfolio/dtos";
import {
	getResourceFromEndpoint,
	type BackoffConfig,
//   getResourceFromEndpoint,
//   type BackoffConfig,
  type GetResourceError,
} from "@shared/fp_react";
import {
	TagFilterFactory,
//   TagFilterFactory,
  type TagFilter,
} from "@shared/models/TagFilter.model";

import { type TaskEither, right } from "fp-ts/TaskEither";
import { SkillFactory, type Skill } from "../models/Skill.model";
import { pipe } from "fp-ts/lib/function";
import { SkillDTOsValidationSchema, TagDTOsValidationSchema, type TagDTO } from "@portfolio/dtos";

// const apiUrl = import.meta.env.VITE_API_URL;

// const defaultBackoffConfig: BackoffConfig = {
//   retries: 3,
//   delay: 500,
//   factor: 2,
// };

// export const getAllSkills = () =>
//   getResourceFromEndpoint(
//     `${apiUrl}/skills`,
//     SkillDTOsValidationSchema,
//     (skillDtos) => skillDtos.map(SkillFactory.fromSkillDTO),
//     defaultBackoffConfig
//   );

// export const getSkillsByTags = (tags: TagFilter[]) =>
//   getResourceFromEndpoint(
//     `${apiUrl}/skills?tags=${encodeURIComponent(
//       tags.map((tag) => tag.id).join(",")
//     )}`,
//     SkillDTOsValidationSchema,
//     (skillDtos) => skillDtos.map(SkillFactory.fromSkillDTO),
//     defaultBackoffConfig
//   );

// export const getAllSkillTags = () =>
//   getResourceFromEndpoint(
//     `${apiUrl}/skillTags`,
//     TagDTOsValidationSchema,
//     (skillDtos: TagDTO[]): TagFilter[] =>
//       skillDtos.map(TagFilterFactory.fromTagDTO),
//     defaultBackoffConfig
//   );

export const skills: Skill[] = [
  { id: "1a2b3c4d", title: "React", level: 90, tags: ["frontend", "javascript", "ui"] },
  { id: "2b3c4d5e", title: "TypeScript", level: 35, tags: ["frontend", "javascript", "typed"] },
  { id: "3c4d5e6f", title: "JavaScript", level: 95, tags: ["frontend", "javascript"] },
  { id: "4d5e6f7g", title: "HTML/CSS", level: 90, tags: ["frontend", "markup", "styles"] },
  { id: "5e6f7g8h", title: "Tailwind CSS", level: 85, tags: ["frontend", "styles", "utility-first"] },
  { id: "6f7g8h9i", title: "Node.js", level: 80, tags: ["backend", "javascript", "server"] },
  { id: "7g8h9i0j", title: "Express.js", level: 75, tags: ["backend", "javascript", "server"] },
  { id: "8h9i0j1k", title: "PostgreSQL", level: 50, tags: ["database", "sql", "relational"] },
  { id: "9i0j1k2l", title: "MongoDB", level: 75, tags: ["database", "nosql", "document"] },
  { id: "0j1k2l3m", title: "Docker", level: 45, tags: ["devops", "containers"] },
  { id: "1k2l3m4n", title: "Vue.js", level: 70, tags: ["frontend", "javascript", "ui"] },
  { id: "2l3m4n5o", title: "Angular", level: 65, tags: ["frontend", "javascript", "typed"] },
  { id: "3m4n5o6p", title: "Svelte", level: 60, tags: ["frontend", "javascript", "ui"] },
  { id: "4n5o6p7q", title: "GraphQL", level: 55, tags: ["backend", "javascript", "server"] },
  { id: "5o6p7q8r", title: "Redis", level: 50, tags: ["database", "nosql"] },
  { id: "6p7q8r9s", title: "Kubernetes", level: 40, tags: ["devops", "containers"] },
  { id: "7q8r9s0t", title: "Bootstrap", level: 70, tags: ["frontend", "styles", "utility-first"] },
  { id: "8r9s0t1u", title: "Material UI", level: 75, tags: ["frontend", "ui", "styles"] },
  { id: "9s0t1u2v", title: "MySQL", level: 65, tags: ["database", "sql", "relational"] },
  { id: "0t1u2v3w", title: "SQLite", level: 55, tags: ["database", "sql", "relational"] },
]


export const skillTagFilters: TagFilter[] = [
  { id: "t1", label: "frontend" },
  { id: "t2", label: "backend" },
  { id: "t3", label: "javascript" },
  { id: "t4", label: "typed" },
  { id: "t5", label: "ui" },
  { id: "t6", label: "markup" },
  { id: "t7", label: "styles" },
  { id: "t8", label: "utility-first" },
  { id: "t9", label: "server" },
  { id: "t10", label: "database" },
  { id: "t11", label: "sql" },
  { id: "t12", label: "relational" },
  { id: "t13", label: "nosql" },
  { id: "t14", label: "document" },
  { id: "t15", label: "devops" },
  { id: "t16", label: "containers" },
]

const apiUrl = import.meta.env.VITE_API_URL;

const defaultBackoffConfig: BackoffConfig = {
  retries: 1,
  delay: 500,
  factor: 2,
};

// export const getAllSkills = (): TaskEither<GetResourceError, Skill[]> =>
//   right(skills);

// export const getSkillsByTags = (
//   tags: TagFilter[]
// ): TaskEither<GetResourceError, Skill[]> =>
//   pipe(
//     tags,
//     (t) => new Set(t.map((tag) => tag.label)),
//     (labels) =>
//       skills.filter((skill) => skill.tags.some((tag) => labels.has(tag))),
//     right
//   );

// export const getAllSkillTags = (): TaskEither<GetResourceError, TagFilter[]> =>
//   right(skillTagFilters);

export const getAllSkills = () =>
  getResourceFromEndpoint(
	`${apiUrl}/skills`,
	SkillDTOsValidationSchema,
	(skillDtos) => skillDtos.map(SkillFactory.fromSkillDTO),
	defaultBackoffConfig
  );

export const getSkillsByTags = (tags: TagFilter[]) =>
  getResourceFromEndpoint(
	`${apiUrl}/skills?tags=${encodeURIComponent(
	  tags.map((tag) => tag.id).join(",")
	)}`,
	SkillDTOsValidationSchema,
	(skillDtos) => skillDtos.map(SkillFactory.fromSkillDTO),
	defaultBackoffConfig
  );

export const getAllSkillTags = () =>
  getResourceFromEndpoint(
	`${apiUrl}/skillsTags`,
	TagDTOsValidationSchema,
	(projectTagDtos: TagDTO[]): TagFilter[] =>
	  projectTagDtos.map(TagFilterFactory.fromTagDTO),
	defaultBackoffConfig
  );