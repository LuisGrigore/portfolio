import { mapMessageDto } from "../mappers/message.mapper";
import type { Message } from "../model/message.model";

const apiUrl = import.meta.env.VITE_API_URL;

export const sendMessage = async (message: Message): Promise<void> => {
  const messageDto = mapMessageDto(message);

  try {
    const response = await fetch(`${apiUrl}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageDto),
    });
    console.log("Message sent successfully:", messageDto);
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
};
