import { useAsync } from "@shared/fp_react";
import { useForm } from "@shared/hooks/useForm";
import { useEffect, useState } from "react";
import { FeedbackFactory, type Feedback } from "../models/Feedback.model";
import { sendFeedback } from "../services/feedback.service";
import { pipe } from "fp-ts/lib/function";
import { usePopup } from "@shared/components/popup/PopupProvider";

type FeedbackFormData = {
  rating: number;
  content: string;
};

export const useFeedback = (
  formRef: React.RefObject<HTMLFormElement | null>,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [matchFeedback, runFeedbackTask] = useAsync();
  const [sendButtonState, setSendButtonState] = useState<"Idle" | "Sending">(
    "Idle",
  );
  const { showPopup } = usePopup();

  const resetFeedback = () => {
    setRating(0);
    setHover(0);
    setIsOpen(false);
  };

  useEffect(
    () =>
      matchFeedback({
        Idle: () => setSendButtonState("Idle"),
        Loading: () => setSendButtonState("Sending"),
        Success: () => {
          showPopup({
            type: "Success",
            message: "Your message was sent successfully 🚀.",
          });
          formRef.current?.reset();
		  resetFeedback();
          setSendButtonState("Idle");
        },
        Error: () => {
          showPopup({
            type: "Error",
            message: "Something went wrong while sending the message.",
          });
          setSendButtonState("Idle");
        },
      }),
    [matchFeedback],
  );

  const { handleSubmit } = useForm((contactFormData: FeedbackFormData) =>
    pipe(
      contactFormData,
      (contactFormData: FeedbackFormData) => {
        return FeedbackFactory.create(
          rating,
          contactFormData.content,
          new Date(),
        );
      },
      (feedback: Feedback) => pipe(feedback, sendFeedback, runFeedbackTask),
    ),
  );
  return {
    isOpen,
    setIsOpen,
    rating,
    setRating,
    hover,
    setHover,
    sendButtonState,
    handleSubmit,
    resetFeedback,
  };
};
