import type { MessageDTO } from "@portfolio/dtos";
import type { Message } from "models/message.model";

export const mapMessageDto= (message:Message): MessageDTO => {
  return {
	id: message.id,
	name: message.name,
	email: message.email,
	content: message.content,
	createdAt: message.createdAt,
  };
}