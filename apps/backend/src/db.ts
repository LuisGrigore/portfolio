import mongoose from "mongoose";
import dotenv from "dotenv";
import { Project } from "./models/project.model.js";

dotenv.config();

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI!;
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DATABASE,
    autoIndex: true,
  });

  await Project.createIndexes();

  console.log("✅ Conectado a MongoDB con autoIndex activado");
};