import { connectDB } from "../db";
import { Project, IProject } from "../models/project.model";
import { toProjectDTO } from "../mappers/project.mapper";
import { ProjectDTO } from "../../../packages/dtos/src/project.dto";

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
