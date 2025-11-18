export interface NetworkError extends Error {
  readonly _tag: "NetworkError";
  readonly cause: Error;
}

export interface HttpError extends Error {
  readonly _tag: "HttpError";
  readonly status: number;
}
