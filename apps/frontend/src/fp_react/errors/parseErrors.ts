import type { ErrorWithCause, ErrorWithMessage } from "./errors";

export interface ParseError extends ErrorWithCause, ErrorWithMessage {
  readonly _tag: "ParseError";
}
