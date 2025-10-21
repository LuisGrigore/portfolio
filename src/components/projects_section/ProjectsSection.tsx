import { ArrowRight, ExternalLink, Github } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "TaskFlow — Collaborative Task Manager",
    description:
      "A real-time task board for teams with drag-and-drop, comments, and activity feeds.",
    imageUrl: "public/projects/Screenshot from 2025-10-21 18-44-41.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Socket.IO", "MongoDB"],
  },
  {
    id: 2,
    title: "ShopWise — Minimal E-commerce Frontend",
    description:
      "A fast, accessible storefront with product browsing, cart, and checkout flow (mocked payments).",
    imageUrl: "public/projects/Screenshot from 2025-10-21 18-44-41.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "FitLog — Personal Fitness Tracker",
    description:
      "Track workouts, progress charts, and custom routines with a focus on data visualization.",
    imageUrl: "public/projects/Screenshot from 2025-10-21 18-44-41.png",
    tags: ["React", "TypeScript", "Recharts", "IndexedDB"],
  },
  {
    id: 4,
    title: "CookBook — Recipe Manager & Meal Planner",
    description:
      "Save, organize, and plan meals with shopping list generation and recipe scaling.",
    imageUrl: "public/projects/Screenshot from 2025-10-21 18-44-41.png",
    tags: ["React", "TypeScript", "SQLite", "Node.js"],
  },
  {
    id: 5,
    title: "PortFolio Studio — Static Site Builder",
    description:
      "A tiny static site generator and CMS for creating personal portfolio pages from Markdown.",
    imageUrl: "public/projects/Screenshot from 2025-10-21 18-44-41.png",
    tags: ["Next.js", "TypeScript", "Markdown"],
  },
  {
    id: 6,
    title: "WeatherCast — Location-aware Weather Dashboard",
    description:
      "Clean, animated weather dashboard with hourly/daily forecasts and bookmarked locations.",
    imageUrl: "public/projects/Screenshot from 2025-10-21 18-44-41.png",
    tags: ["React", "TypeScript", "OpenWeatherMap API", "Geolocation"],
  },
];

type ProjectCardProps = {
  project: Project;
};

const ProjectCard:React.FC<ProjectCardProps> = ({ project }: ProjectCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-1 flex-grow">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-3">
            <a
              href={project.demoUrl || "#"}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              target="_blank"
            >
              <ExternalLink size={20} />
            </a>
            <a
              href={project.githubUrl || "#"}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
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

export const ProjectsSection:React.FC = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of the projects I've worked on recently. Feel free to
          explore and check out the code on GitHub!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, indx) => {
            return <ProjectCard key={indx} project={project} />;
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
