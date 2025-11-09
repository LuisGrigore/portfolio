import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "../section_titile/SectionTitle";
import { useProjectSection } from "./useProjectSection";
import TagFilterBar from "./TagFilterBar";
import ProjectsGrid from "./ProjectsGrid";

// ProjectsSection composes TagFilterBar and ProjectsGrid and manages selected tags

export const ProjectsSection: React.FC = () => {
  const { projects, tags, getAllProjects, getProjectsByTag } = useProjectSection();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const onToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      // trigger fetch with new selection
      if (next.length === 0) getAllProjects();
      else getProjectsByTag(next);
      return next;
    });
  };

  const onClear = () => {
    setSelectedTags([]);
    getAllProjects();
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          text_white="My"
          text_primary="Projects"
          introduction="Here are some of the projects I've worked on recently. Feel free to
          explore and check out the code on GitHub!"
        />

        <TagFilterBar tags={tags} selectedTags={selectedTags} onToggleTag={onToggleTag} onClear={onClear} />

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
