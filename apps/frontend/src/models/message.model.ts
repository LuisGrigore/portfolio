import type { MessageDTO } from "@portfolio/dtos";

export type Message = {
  name: string;
  email: string;
  content: string;
  createdAt: Date;
};

export const MessageFactory = {
  create: (name: string, email: string, content: string, createdAt: Date):Message => ({
    name: name,
    email: email,
    content: content,
    createdAt: createdAt,
  }),
  toDTO: (message:Message):MessageDTO => ({
	name: message.name,
	email: message.email,
	content: message.content,
	createdAt: message.createdAt,
  })
};
