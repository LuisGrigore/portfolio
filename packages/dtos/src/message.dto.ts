import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types";


export const MessageDTOValidationSchema = t.type({
  name: t.string,
  email: t.string,
  content: t.string,
  createdAt: DateFromISOString,
});


export type MessageDTO = t.TypeOf<typeof MessageDTOValidationSchema>;
