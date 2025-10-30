import type { ErrorWithCause, ErrorWithMessage } from "./errors";

export interface NetworkError extends ErrorWithCause {
  readonly _tag: "NetworkError";
  readonly cause: Error;
}

export interface HttpError extends ErrorWithCause, ErrorWithMessage {
  readonly _tag: "HttpError";
  readonly status: number;
}
