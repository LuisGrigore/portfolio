import type { FeedbackDTO } from "@portfolio/dtos";

export type Feedback = {
  rating: number;
  content: string;
  createdAt: Date;
};

export const FeedbackFactory = {
  create: (rating: number, content: string, createdAt: Date):Feedback => ({
    rating: rating,
    content: content,
    createdAt: createdAt,
  }),
  toDTO: (message:Feedback):FeedbackDTO => ({
	rating: message.rating,
	content: message.content,
	createdAt: message.createdAt,
  })
};
