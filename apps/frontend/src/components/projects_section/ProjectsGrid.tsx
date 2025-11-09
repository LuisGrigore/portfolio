import React from "react";
import type { AsyncState } from "../../fp_react/hooks/useAsync";
import type { Project } from "@models/project.model";
import type { GetResourceError } from "@services/project.service";
import { ExternalLink, Github } from "lucide-react";

type Props = {
  projects: AsyncState<GetResourceError, readonly Project[]>;
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col h-full">
    <div className="h-48 overflow-hidden">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <div className="p-6 flex flex-col grow">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, indx) => (
          <span key={indx} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-1 grow">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 grow">{project.description}</p>
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
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export const ProjectsGrid: React.FC<Props> = ({ projects }) => {
  if (projects._tag === "Loading" || projects._tag === "Idle") {
    return (
      <div className="text-center mt-12">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (projects._tag === "Error") {
    return (
      <div className="text-center mt-12">
        <p>Error loading projects: {String(projects.error)}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
