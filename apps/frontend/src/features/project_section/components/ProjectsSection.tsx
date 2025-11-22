import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@shared/components/section_titile/SectionTitle";
import TagFilterBar from "@shared/components/tag_filter_bar/TagFilterBar";
import ProjectsGrid from "./ProjectsGrid";
import { useProjectTags } from "../hooks/useProjectTags";
import { matchError } from "@shared/errors/errorHandler";
import { useProjects } from "../hooks/useProjects";


export const ProjectsSection: React.FC = () => {
  const { matchProjects, getAllProjects, getProjectsByTag } = useProjects();
  const { matchTags } = useProjectTags();

  const onClear = () => {
    getAllProjects();
  };

  const loadingDisplay = (message: string) => (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );

  const errorDisplay = (mssg: string, error: string) => (
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
          Idle: () => loadingDisplay("Loading tags..."),
          Loading: () => loadingDisplay("Loading tags..."),
          Error: (error) =>
            matchError(error, {
              NetworkError: (error) =>
                errorDisplay(
                  "NetworkError while loading tags",
                  error.cause.message
                ),
              HttpError: (error) =>
                errorDisplay(
                  "HttpError while loading tags",
                  error.status.toString()
                ),
              ParseError: (error) =>
                errorDisplay("ParseError while loading tags", error.message),
              ValidationError: (error) =>
                errorDisplay(
                  "ValidationError while loading tags",
                  error.cause?.toString() || ""
                ),
            }),
          Success: (tags) => (
            <TagFilterBar
              tags={tags}
              onSelectionChange={(tags) =>
                getProjectsByTag(tags)
              }
              onClear={onClear}
            />
          ),
        })}
		{matchProjects({
          Idle: () => loadingDisplay("Loading projects..."),
          Loading: () => loadingDisplay("Loading projects..."),
          Error: (error) =>
            matchError(error, {
              NetworkError: (error) =>
                errorDisplay(
                  "NetworkError while loading projects",
                  error.cause.message
                ),
              HttpError: (error) =>
                errorDisplay(
                  "HttpError while loading projects",
                  error.status.toString()
                ),
              ParseError: (error) =>
                errorDisplay("ParseError while loading projects", error.message),
              ValidationError: (error) =>
                errorDisplay(
                  "ValidationError while loading projects",
                  error.cause?.toString() || ""
                ),
            }),
          Success: (projects) => (
           <ProjectsGrid projects={projects} />
          ),
        })}
        

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
