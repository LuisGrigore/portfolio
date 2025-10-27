import { useState } from "react";
import type { Message } from "../../models/message.model";
import { sendMessage } from "../../services/message.service";


export const useContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setContent("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newMessage: Message = {
      // id se omite al enviar
      name,
      email,
      content,
      createdAt: new Date(),
    };

    try {
      await sendMessage(newMessage);
      resetForm();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
  };
};