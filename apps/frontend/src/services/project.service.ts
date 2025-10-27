import type { ProjectDTO } from "../../../dtos/project.dto";
import { mapProjectData } from "../mappers/project.mapper";
import type { Project } from "../model/project.model";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${apiUrl}/getProjects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const projectDtos: ProjectDTO[] = await response.json();
    const projects: Project[] = projectDtos.map(mapProjectData);
    return projects;
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
};
