import { FeedbackDTO } from "@portfolio/dtos";
import { IFeedback } from "../models/feedback.model.js";


export function toFeedbackDTO(feedback: IFeedback): FeedbackDTO {
  return {
	rating: feedback.rating,
	content: feedback.content,
	createdAt: feedback.createdAt,
  };
}
