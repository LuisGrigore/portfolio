import type { Message } from "../model/message.model";
import type { MessageDTO } from '../../../dtos/message.dto';

export const mapMessageDto= (message:Message): MessageDTO => {
  return {
	id: message.id,
	name: message.name,
	email: message.email,
	content: message.content,
	createdAt: message.createdAt,
  };
}