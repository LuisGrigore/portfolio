import { connectDB } from "../db";
import { Message } from "../models/message.model";
import { toMessageDTO } from "../mappers/message.mapper";
export async function createMessage(data) {
    await connectDB();
    const message = new Message(data);
    const savedMessage = await message.save();
    return toMessageDTO(savedMessage);
}
