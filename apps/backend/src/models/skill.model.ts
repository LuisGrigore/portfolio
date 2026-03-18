import mongoose, { Schema, Model, Document, Types } from "mongoose";
import "./skillTag.model";

export interface ISkill extends Document {
  title: string;
  tags: Types.ObjectId[];
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    title: { type: String, required: true },
	tags: [{ type: Schema.Types.ObjectId, ref: 'SkillTag', required: true }],
	level: { type: Number },
  },
  { timestamps: true },
);

skillSchema.index({ tags: 1 });

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);
