import {
  fpFetchJson,
  type FetchParseError,
  taskEitherWithBackoff,
} from "@shared/fp_react";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import type { ValidationError } from "@shared/errors/validationErrors";
import {  type Feedback } from "../models/Feedback.model";
import {  toFeedbackDTO } from "../mappers/feedback.mapper";

const apiUrl = import.meta.env.VITE_API_URL;

export type SendFeedbackError = FetchParseError | ValidationError;

export const sendFeedback = (
  feedback: Feedback
): TE.TaskEither<SendFeedbackError, void> =>
  taskEitherWithBackoff(
	pipe(feedback, toFeedbackDTO, (feedbackDto) =>
	  pipe(
		fpFetchJson<unknown[]>(`${apiUrl}/feedback`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(feedbackDto),
		}),
		TE.mapLeft((error) => error as SendFeedbackError),
		TE.map(() => undefined)
	  )
	),
	3,
	500,
	2
  );
