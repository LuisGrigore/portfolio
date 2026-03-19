import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@shared/components/section_titile/SectionTitle";
import TagFilterBar from "@shared/components/tag_filter_bar/TagFilterBar";
import ProjectsGrid from "./ProjectsGrid";
import { useProjectTags } from "../hooks/useProjectTags";
import { matchError } from "@shared/errors/errorHandler";
import { useProjects } from "../hooks/useProjects";
import type { Project } from "../models/Project.model";
import ProjectModal from "./ProjectModal";

import "tippy.js/dist/tippy.css";
import { ToolTip } from "@shared/components/tooltip/ToolTip";
import paragraph from "../content/paragraph.md?raw";
import { loadingDisplay } from "@shared/components/loading_display/LoadingDisplay";
import { errorDisplay } from "@shared/components/error_display/ErrorDisplay";

export const ProjectsSection: React.FC = () => {
  const { matchProjects, getAllProjects, getProjectsByTag } = useProjects();
  const { matchTags } = useProjectTags();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onClear = () => getAllProjects();

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative"
    >
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          text_white="My"
          text_primary="Projects"
          introduction={paragraph}
        />

        {matchTags({
          Idle: () => loadingDisplay("Loading tags..."),
          Loading: () => loadingDisplay("Loading tags..."),
          Error: (error) =>
            matchError(error, {
              NetworkError: (error) =>
                errorDisplay(
                  "NetworkError while loading tags",
                  error.cause.message,
                ),
              HttpError: (error) =>
                errorDisplay(
                  "HttpError while loading tags",
                  error.status.toString(),
                ),
              ParseError: (error) =>
                errorDisplay("ParseError while loading tags", error.message),
              ValidationError: (error) =>
                errorDisplay(
                  "ValidationError while loading tags",
                  error.cause?.toString() || "",
                ),
            }),
          Success: (tags) => (
            <ToolTip
              step={1}
              id="tag-filter-tooltip"
              placement={window.innerWidth < 1444 ? "top" : "right"}
              content="Filter projects by selecting tags. Click 'Clear' to show all projects."
            >
              <TagFilterBar
                tags={tags}
                onSelectionChange={(tags) => {
                  setSelectedTags(tags.map((t) => t.label));
                  getProjectsByTag(tags);
                }}
                onClear={onClear}
              />
            </ToolTip>
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
                  error.cause.message,
                ),
              HttpError: (error) =>
                errorDisplay(
                  "HttpError while loading projects",
                  error.status.toString(),
                ),
              ParseError: (error) =>
                errorDisplay(
                  "ParseError while loading projects",
                  error.message,
                ),
              ValidationError: (error) =>
                errorDisplay(
                  "ValidationError while loading projects",
                  error.cause?.toString() || "",
                ),
            }),
          Success: (projects) => (
            <ProjectsGrid
              projects={projects}
              onProjectClick={setSelectedProject}
              selectedTags={selectedTags}
            />
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

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
