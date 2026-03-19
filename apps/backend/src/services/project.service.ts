import { connectDB } from "../db.js";
import { IProject, Project } from "../models/project.model.js";
import { toProjectDTO } from "../mappers/project.mapper.js";
import { ProjectDTO } from "@portfolio/dtos/src/project.dto.js";
import "../models/projectTag.model.js";

interface IGetProyectQueryResult {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  tags: { tag: string }[];
  github_url?: string;
  readme_url?: string;
  demo_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllProjects(): Promise<ProjectDTO[]> {
  await connectDB();

  const projects: IGetProyectQueryResult[] = await Project.find()
    .sort({ createdAt: -1 })
    .populate<{ tags: { tag: string }[] }>({
      path: "tags",
      match: { isActive: true },
      select: "tag",
    })
    .lean<IGetProyectQueryResult[]>();

  return projects.map((project) => ({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    tags: project.tags.map((t) => t.tag),
    github_url: project.github_url,
	readme_url: project.readme_url,
    demo_url: project.demo_url,
  }));
}


import mongoose from "mongoose";

export async function getProjectsWithTags(tagsArray: string[]): Promise<ProjectDTO[]> {
  await connectDB();

  const tagObjectIds = tagsArray
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  const projects = await Project.aggregate([
    // ✅ lookup correcto
    {
      $lookup: {
        from: "projecttags", // 👈 AQUÍ estaba el fallo
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },

    // ✅ filtrar solo activas
    {
      $addFields: {
        tags: {
          $filter: {
            input: "$tags",
            as: "tag",
            cond: { $eq: ["$$tag.isActive", true] },
          },
        },
      },
    },

    // ✅ calcular matchScore correctamente
    {
      $addFields: {
        matchScore: {
          $size: {
            $filter: {
              input: "$tags",
              as: "tag",
              cond: {
                $in: ["$$tag._id", tagObjectIds],
              },
            },
          },
        },
      },
    },

    // ✅ orden correcto (clave para paginación futura)
    {
      $sort: {
        matchScore: -1,
        createdAt: -1,
      },
    },
  ]);

  // ✅ map final igual que antes
  return projects.map((project: any) => ({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    tags: project.tags.map((t: any) => t.tag), // 👈 ahora sí funciona
    github_url: project.github_url,
    readme_url: project.readme_url,
    demo_url: project.demo_url,
  }));
}

export async function createProject(
  data: Partial<IProject>,
): Promise<ProjectDTO> {
  await connectDB();
  const project = new Project(data);
  const savedProject = await project.save();
  return toProjectDTO(savedProject);
}
