import type { Message } from "../models/Message.model";
import { useAsync } from "@shared/fp_react/hooks/useAsync";
import { pipe } from "fp-ts/function";
import { sendMessage } from "../services/message.service";

export const useSendMessage = () => {
  const [matchMessage, runMessageTask] = useAsync();

  return {
    matchMessage: matchMessage,
    sendMessage: (message: Message) =>
      pipe(message, sendMessage, runMessageTask),
  };
};
