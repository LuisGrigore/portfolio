import { MessageDTO } from "@portfolio/dtos";
import { IMessage } from "../models/message.model.js";

export function toMessageDTO(message: IMessage): MessageDTO {
  return {
    id: "message._id.toString()",
    name: message.name,
	email: message.email,
	content: message.content,
	createdAt: message.createdAt,
  };
}
