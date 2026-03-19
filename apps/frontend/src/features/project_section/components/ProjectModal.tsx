import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, Github } from "lucide-react";
import type { Project } from "../models/Project.model";
import { useProjectDetails } from "../hooks/useProjectDetails";
import { loadingDisplay } from "@shared/components/loading_display/LoadingDisplay";
import { matchError } from "@shared/errors/errorHandler";
// import { errorDisplay } from "@shared/components/error_display/ErrorDisplay";
// import { div } from "three/src/nodes/math/OperatorNode.js";
import { MarkdownRenderer } from "@shared/components/markdown_renderer/MarkdownRenderer";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { matchProjectDetails } = useProjectDetails(project);
  // Placeholder detailed description with proper formatting
  const detailedDescription = `${project.description}

This project showcases advanced development techniques and modern web technologies. Built with attention to performance, user experience, and clean code architecture.

Key Features:
• Responsive design that works seamlessly across all devices
• Optimized performance with lazy loading and code splitting
• Accessible components following WCAG guidelines
• Clean, maintainable codebase with comprehensive testing

Technologies Used:
The project leverages cutting-edge tools and frameworks to deliver a robust solution. Each technology was carefully selected to ensure scalability and maintainability.

Challenges Overcome:
During development, several complex challenges were addressed, including cross-browser compatibility, performance optimization, and implementing complex user interactions.

Future Enhancements:
The project is designed with extensibility in mind, allowing for easy addition of new features and integrations as requirements evolve.`;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const modalContent = (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-999 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-1000 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden max-h-[calc(90vh-1rem)] sm:max-h-[calc(85vh-3rem)]">
            <div className="mb-4 sm:mb-6">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pr-8">
              {project.title}
            </h2>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium border rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-muted-foreground text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4">
              {/* {detailedDescription.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className={paragraph.startsWith("•") ? "ml-4" : ""}
                >
                  {paragraph}
                </p>
              ))} */}
              {matchProjectDetails({
                Idle: () => loadingDisplay("Loading projectDetails..."),
                Loading: () => loadingDisplay("Loading projectDetails..."),
                Error: (error) =>
                  matchError(error, {
                    NetworkError: (error) => (
                      <MarkdownRenderer textDir="left">
                        {project.description}
                      </MarkdownRenderer>
                    ),
                    //   errorDisplay(
                    //     "NetworkError while loading project details",
                    //     error.cause.message,
                    //   ),
                    HttpError: (error) => (
                      <MarkdownRenderer textDir="left">
                        {project.description}
                      </MarkdownRenderer>
                    ),
                    //   errorDisplay(
                    //     "HttpError while loading project details",
                    //     error.status.toString(),
                    //   ),
                    ParseError: (error) => (
                      <MarkdownRenderer textDir="left">
                        {project.description}
                      </MarkdownRenderer>
                    ),
                    //   errorDisplay(
                    //     "ParseError while loading project details",
                    //     error.message,
                    //   ),
                    ValidationError: (error) => (
                      <MarkdownRenderer textDir="left">
                        {project.description}
                      </MarkdownRenderer>
                    ),
                    //   errorDisplay(
                    //     "ValidationError while loading project details",
                    //     error.cause?.toString() || "",
                    //   ),
                  }),
                Success: (projectDetails) => (
                  <MarkdownRenderer textDir="left">
                    {projectDetails}
                  </MarkdownRenderer>
                ),
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cosmic-button flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  View Demo <ExternalLink size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cosmic-button flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  View Code <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
