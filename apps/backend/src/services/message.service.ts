import { connectDB } from "../db.js";
import { IMessage, Message } from "../models/message.model.js";
import { MessageDTO } from "@portfolio/dtos/src/message.dto.js";
import { toMessageDTO } from "../mappers/message.mapper.js";

export async function createMessage(data: IMessage): Promise<MessageDTO> {
  await connectDB();
  const message = new Message(data);
  const savedMessage = await message.save();
  return toMessageDTO(savedMessage);
}
