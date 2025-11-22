import { MessageFactory, type Message } from "../models/Message.model";
import {
  fpFetchJson,
  type FetchParseError,
  taskEitherWithBackoff,
} from "@shared/fp_react";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import type { ValidationError } from "@shared/errors/validationErrors";

const apiUrl = import.meta.env.VITE_API_URL;

export type SendMessageError = FetchParseError | ValidationError;

export const sendMessage = (
  message: Message
): TE.TaskEither<SendMessageError, void> =>
  taskEitherWithBackoff(
    pipe(message, MessageFactory.toDTO, (messageDto) =>
      pipe(
        fpFetchJson<unknown[]>(`${apiUrl}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageDto),
        }),
        TE.mapLeft((error) => error as SendMessageError),
        TE.map(() => undefined)
      )
    ),
    3,
    500,
    2
  );
