import type { MessageDTO } from "@portfolio/dtos";
import type { Message } from "../models/Message.model";

export const toMessage = (messageDTO: MessageDTO): Message => ({
  name: messageDTO.name,
  email: messageDTO.email,
  content: messageDTO.content,
  createdAt: messageDTO.createdAt,
});

export const toMessageDTO = (message: Message): MessageDTO => ({
  name: message.name,
  email: message.email,
  content: message.content,
  createdAt: message.createdAt,
});