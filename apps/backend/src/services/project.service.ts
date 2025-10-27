import { connectDB } from "../db.js";
import { IProject, Project } from "../models/project.model.js";
import { toProjectDTO } from "../mappers/project.mapper.js";
import { ProjectDTO } from "@portfolio/dtos/src/project.dto.js";

export async function getAllProjects(): Promise<ProjectDTO[]> {
  await connectDB();
  const projects: IProject[] = await Project.find().sort({ createdAt: -1 });
  return projects.map(toProjectDTO);
}

export async function createProject(data: Partial<IProject>): Promise<ProjectDTO> {
  await connectDB();
  const project = new Project(data);
  const savedProject = await project.save();
  return toProjectDTO(savedProject);
}
