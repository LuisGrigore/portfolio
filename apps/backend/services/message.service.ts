import { connectDB } from "../db";
import { IMessage, Message } from "../models/message.model";
import { MessageDTO } from "../../../packages/dtos/src/message.dto"
import { toMessageDTO } from "../mappers/message.mapper";

export async function createMessage(data: IMessage): Promise<MessageDTO> {
  await connectDB();
  const message = new Message(data);
  const savedMessage = await message.save();
  return toMessageDTO(savedMessage);
}
