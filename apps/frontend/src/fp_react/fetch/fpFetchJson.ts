import type { ParseError } from "fp_react/errors/parseErrors";
import { fpFetch, type FetchError } from "./fpFetch";
import { pipe } from "fp-ts//function";
import * as TE from "fp-ts/TaskEither";

export type FetchParseError = FetchError | ParseError;

export const fpFetchJson = <A>(
  input: RequestInfo | URL,
  init?: RequestInit
): TE.TaskEither<FetchParseError, A> =>
  pipe(
    fpFetch(input, init),
    TE.chain((res) =>
      TE.tryCatch<FetchParseError, A>(
        () => res.json() as Promise<A>,
        (err) => ({
          _tag: "ParseError",
          cause: err instanceof Error ? err : new Error(String(err)),
        } as ParseError)
      )
    )
  );