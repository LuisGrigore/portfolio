import type { FeedbackDTO } from "@portfolio/dtos";
import type { Feedback } from "../models/Feedback.model";

export const toFeedback = (feedbackDTO: FeedbackDTO): Feedback => ({
  rating: feedbackDTO.rating,
  content: feedbackDTO.content,
  createdAt: feedbackDTO.createdAt,
});

export const toFeedbackDTO = (feedback: Feedback): FeedbackDTO => ({
  rating: feedback.rating,
  content: feedback.content,
  createdAt: feedback.createdAt,
});