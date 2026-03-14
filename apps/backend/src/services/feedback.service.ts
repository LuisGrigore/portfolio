import { FeedbackDTO } from "@portfolio/dtos";
import { connectDB } from "../db.js";
import { toFeedbackDTO } from "../mappers/feedback.mapper.js";
import { Feedback, IFeedback } from "../models/feedback.model.js";


export async function createFeedback(data: IFeedback): Promise<FeedbackDTO> {
  await connectDB();
  const feedback = new Feedback(data);
  const savedFeedback = await feedback.save();
  return toFeedbackDTO(savedFeedback);
}
