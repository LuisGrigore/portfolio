import { connectDB } from "../db";
import { Project } from "../models/project.model";
import { toProjectDTO } from "../mappers/project.mapper";
export async function getAllProjects() {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return projects.map(toProjectDTO);
}
export async function createProject(data) {
    await connectDB();
    const project = new Project(data);
    const savedProject = await project.save();
    return toProjectDTO(savedProject);
}
