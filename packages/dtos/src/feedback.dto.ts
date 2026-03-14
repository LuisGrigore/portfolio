import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types";


export const FeedbackDTOValidationSchema = t.type({
  rating: t.number,
  content: t.string,
  createdAt: DateFromISOString,
});


export type FeedbackDTO = t.TypeOf<typeof FeedbackDTOValidationSchema>;
