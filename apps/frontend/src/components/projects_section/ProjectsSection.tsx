import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "../section_titile/SectionTitle";
import { useProjectSection } from "./useProjectSection";
import TagFilterBar from "./TagFilterBar";
import ProjectsGrid from "./ProjectsGrid";
import { useProjectTags } from "@hooks/useProjectTags";
import { matchError } from "@errors/errorHandler";

export const ProjectsSection: React.FC = () => {
  const { projects, getAllProjects, getProjectsByTag } = useProjectSection();
  const { matchTags } = useProjectTags();

  const onClear = () => {
    getAllProjects();
  };

  const loading = () => (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">Loading tags...</p>
    </div>
  );

  const errorDisplay = (mssg: string, error:string) => (
    <div className="mb-6">
      <p className="text-sm text-destructive">
        {mssg} : {error}
      </p>
    </div>
  );

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          text_white="My"
          text_primary="Projects"
          introduction="Here are some of the projects I've worked on recently. Feel free to
          explore and check out the code on GitHub!"
        />
        {matchTags({
          Idle: loading,
          Loading: loading,
          Error: (error) =>
            matchError(error, {
              NetworkError: (error) => errorDisplay("NetworkError while loading tags", error.cause.message),
              HttpError: (error) => errorDisplay("HttpError while loading tags", error.status.toString()),
              ParseError: (error) => errorDisplay("ParseError while loading tags", error.message),
              ValidationError: (error) => errorDisplay("ValidationError while loading tags", error.cause?.toString() || ""),
            }),
          Success: (tags) => (
            <TagFilterBar
              tags={tags}
              onSelectionChange={(tags) => getProjectsByTag(tags.map((tag) => tag.tag))}
			  onClear={onClear}
            />
          ),
        })}

        <ProjectsGrid projects={projects} />

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/LuisGrigore"
          >
            Check My GitHub <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};
