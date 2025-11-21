import { MessageFactory } from "@models/Message.model";
import { pipe } from "fp-ts/lib/function";
import { useSendMessage } from "@hooks/useSendMessage";
import { useForm } from "@hooks/useForm";
import { useEffect, useState } from "react";
import { usePopup } from "@components/popup/PopupProvider";

type ContactFormData = {
  name: string;
  email: string;
  content: string;
};

export const useContactForm = (
  formRef: React.RefObject<HTMLFormElement | null>
) => {
  const { matchMessage, sendMessage } = useSendMessage();
  const { showPopup } = usePopup();
  const [sendButtonState, setSendButtonState] = useState<"Idle" | "Sending">(
    "Idle"
  );

  useEffect(() => matchMessage({
    Idle: () => setSendButtonState("Idle"),
    Loading: () => setSendButtonState("Sending"),
    Success: () => {
      showPopup({
        type: "Success",
        message: "Your message was sent successfully 🚀.",
      });
      formRef.current?.reset();
      setSendButtonState("Idle");
    },
    Error: () => {
      showPopup({
        type: "Error",
        message: "Something went wrong while sending the message.",
      });
      setSendButtonState("Idle");
    },
  }), [matchMessage]);
  

  const { handleSubmit } = useForm((contactFormData: ContactFormData) =>
    pipe(
      contactFormData,
      (contactFormData:ContactFormData) => {
        return MessageFactory.create(
          contactFormData.name,
          contactFormData.email,
          contactFormData.content,
          new Date()
        )},
      sendMessage
    )
  );

  return { sendButtonState: sendButtonState, handleSubmit: handleSubmit };
};

