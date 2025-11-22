import type { ParseError } from "@shared/fp_react/errors/parseErrors";
import { fpFetch } from "./fpFetch";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import type { NetworkError, HttpError } from "@shared/fp_react/errors/networkErrors";

export type FetchParseError = NetworkError | HttpError | ParseError;

export const fpFetchJson = <A>(
  input: RequestInfo | URL,
  init?: RequestInit
): TE.TaskEither<FetchParseError, A> =>
  pipe(
    fpFetch(input, init),
    TE.chain((res) =>
      TE.tryCatch<FetchParseError, A>(
        () => res.json() as Promise<A>,
        () => ({
          _tag: "ParseError",
        } as ParseError)
      )
    )
  );