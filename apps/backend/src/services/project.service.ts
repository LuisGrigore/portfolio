import { connectDB } from "../db.js";
import { IProject, Project } from "../models/project.model.js";
import { toProjectDTO } from "../mappers/project.mapper.js";
import {
  ProjectDTO,
  ProjectsPageDTO,
} from "@portfolio/dtos/src/project.dto.js";
import "../models/projectTag.model.js";
import mongoose from "mongoose";

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

export async function getProjectsWithTags(
  tagsArray: string[],
  page: number,
): Promise<ProjectsPageDTO> {
  await connectDB();

  const tagObjectIds = tagsArray
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  const limit = 6;

  const result = await Project.aggregate([
    {
      $lookup: {
        from: "projecttags",
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },
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
    {
      $sort: {
        matchScore: -1,
        priority: -1,
        createdAt: -1,
      },
    },

    {
      $facet: {
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  const data = result[0].data;
  const totalItems = result[0].totalCount[0]?.count ?? 0;

  const projects = data.map((project: any) => ({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    tags: project.tags.map((t: any) => t.tag),
    github_url: project.github_url,
    readme_url: project.readme_url,
    demo_url: project.demo_url,
  }));

  const totalPages = Math.ceil(totalItems / limit);

  return {
    projects,
    total_pages: totalPages,
    current_page: page,
    total_items: totalItems,
    items_per_page: limit,
  };
}

export async function createProject(
  data: Partial<IProject>,
): Promise<ProjectDTO> {
  await connectDB();
  const project = new Project(data);
  const savedProject = await project.save();
  return toProjectDTO(savedProject);
}
