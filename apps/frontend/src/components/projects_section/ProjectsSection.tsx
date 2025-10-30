import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { SectionTitle } from "../section_titile/SectionTitle";
import type { Project } from "../../models/project.model";
import { useProjectSection } from "./useProjectSection";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}: ProjectCardProps) => {
  return (
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
          {project.tags.map((tag) => (
            <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-1 grow">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 grow">
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
};

export const ProjectsSection: React.FC = () => {
  const { projects } = useProjectSection();

  if (projects._tag === "Loading" || projects._tag === "Idle") {
    return (
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle
            text_white="My"
            text_primary="Projects"
            introduction="Here are some of the projects I've worked on recently. Feel free to
	        explore and check out the code on GitHub!"
          />
          <div className="text-center mt-12">
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }
  if (projects._tag === "Error") {
    return (
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle
            text_white="My"
            text_primary="Projects"
            introduction="Here are some of the projects I've worked on recently. Feel free to
	        explore and check out the code on GitHub!"
          />
          <div className="text-center mt-12">
            <p>Error loading projects: {String(projects.error)}</p>
          </div>
        </div>
      </section>
    );
  }

  const { data: projectsData } = projects;

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          text_white="My"
          text_primary="Projects"
          introduction="Here are some of the projects I've worked on recently. Feel free to
          explore and check out the code on GitHub!"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => {
            return (
              <ProjectCard key={project.id.toString()} project={project} />
            );
          })}
        </div>
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
