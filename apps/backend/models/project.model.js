import mongoose, { Schema } from "mongoose";
const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    tags: { type: [String], default: [] },
    github_url: { type: String, required: false },
    demo_url: { type: String, required: false },
}, { timestamps: true });
projectSchema.index({ tags: 1 });
export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
