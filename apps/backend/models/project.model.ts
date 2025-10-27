import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  github_url?: string;
  demo_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    tags: { type: [String], default: [] },
    github_url: { type: String, required: false },
    demo_url: { type: String, required: false },
  },
  { timestamps: true }
);

projectSchema.index({ tags: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
