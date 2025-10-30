export interface Error {
  readonly _tag: string;
}

export interface ErrorWithMessage extends Error {
  readonly message?: string;
}

export interface ErrorWithCause extends Error {
  readonly cause?: unknown;
}
