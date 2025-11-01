import type { ErrorWithCause } from "./errors";

export interface ValidationError extends ErrorWithCause {
  readonly _tag: "ValidationError";
  readonly cause?: unknown;
}
