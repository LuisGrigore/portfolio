import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image_url: string;
  tags: Types.ObjectId[];
  github_url?: string;
  readme_url?: string;
  demo_url?: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: 'ProjectTag', required: true }],
    github_url: { type: String, required: false },
	readme_url: {type: String, required: false},
    demo_url: { type: String, required: false },
	priority: { type: Number, required: true },
  },
  { timestamps: true }
);

projectSchema.index({ tags: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);