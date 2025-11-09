import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProjectTag extends Document {
  tag: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectTagSchema = new Schema<IProjectTag>(
  {
    tag: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);


export const ProjectTag: Model<IProjectTag> =
  mongoose.models.ProjectTag || mongoose.model<IProjectTag>("ProjectTag", projectTagSchema);
