import React from "react";
import type { Project } from "../models/Project.model";
import { ExternalLink, Github } from "lucide-react";
import { ToolTip } from "../../../shared/components/tooltip/ToolTip";

type ProjectsGridProps = {
  projects: readonly Project[];
  onProjectClick: (project: Project) => void;
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => (
  <div
    className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col h-full cursor-pointer"
    onClick={onClick}
  >
    <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <div className="p-4 sm:p-6 flex flex-col grow">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, indx) => (
          <span
            key={indx}
            className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-lg sm:text-xl font-semibold mb-1 grow">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-xs sm:text-sm mb-4 grow">
        {project.description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex space-x-3">
          <a
            href={project.demoUrl || "#"}
            className={
              project.demoUrl
                ? "text-foreground/80 hover:text-primary transition-colors duration-300"
                : "hidden"
            }
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={project.githubUrl || "#"}
            className={
              project.githubUrl
                ? "text-foreground/80 hover:text-primary transition-colors duration-300"
                : "hidden"
            }
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  onProjectClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {projects.map((project, index) =>
        index === 0 ? (
          <ToolTip
            step={2}
            key={project.id}
            id="first-project"
            placement={window.innerWidth < 1444 ? "bottom" : "left"}
            content={
              <div className="bg-card text-foreground rounded-lg p-3 shadow-lg max-w-xs text-sm">
                <p className="mb-2">
                  Click on a project card to open its detailed view and learn
                  more about the project.
                </p>
                <p className="mb-2">
                  To access the live demo or explore the source code, use the
                  icons below.
                </p>
                <div className="flex items-center gap-3 text-foreground/80">
                  <span className="flex items-center gap-1">
                    <ExternalLink size={16} />
                    <span>Live demo</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Github size={16} />
                    <span>Source code</span>
                  </span>
                </div>
              </div>
            }
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
            />
          </ToolTip>
        ) : (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ),
      )}
    </div>
  );
};

export default ProjectsGrid;
