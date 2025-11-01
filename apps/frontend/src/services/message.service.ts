import { mapMessageDto } from "@mappers/message.mapper";
import type { Message } from "@models/message.model";
import {
  fpFetchJson,
  type FetchParseError,
} from "../fp_react/fetch/fpFetchJson";
import { pipe } from "fp-ts/function";
import { taskEitherWithBackoff } from "../fp_react/async_utils/retryTaskEither";
import * as TE from "fp-ts/TaskEither";
import type { ValidationError } from "../errors/validationErrors";

const apiUrl = import.meta.env.VITE_API_URL;

export type SendMessageError = FetchParseError | ValidationError;

export const sendMessage = (
  message: Message
): TE.TaskEither<SendMessageError, void> =>
  taskEitherWithBackoff(
    pipe(message, mapMessageDto, (messageDto) =>
      pipe(
        fpFetchJson<unknown[]>(`${apiUrl}/sendMessage`, {
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
