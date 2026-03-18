import mongoose, { Schema, Model, Document } from "mongoose";

export interface ISkillTag extends Document {
  tag: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const skillTagSchema = new Schema<ISkillTag>(
  {
    tag: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);


export const SkillTag: Model<ISkillTag> =
  mongoose.models.SkillTag || mongoose.model<ISkillTag>("SkillTag", skillTagSchema);
