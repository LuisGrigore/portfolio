import mongoose, { Schema, Model, Document } from "mongoose";

export interface IFeedback extends Document {
  content: string;
  rating: number;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>(
  {
	content: { type: String, required: true },
	rating: { type: Number, required: true },
  },
  { timestamps: true }
);


export const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", feedbackSchema);
