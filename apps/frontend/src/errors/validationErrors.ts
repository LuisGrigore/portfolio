import * as t from "io-ts";

export interface ValidationError extends Error {
  readonly _tag: "ValidationError";
  readonly cause?: t.Errors;
}
