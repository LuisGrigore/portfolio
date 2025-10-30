import { tryCatch, type TaskEither } from "fp-ts/TaskEither";
import type { HttpError, NetworkError } from "fp_react/errors/networkErrors";

export type FetchError = NetworkError | HttpError;

export const fpFetch = (
  input: RequestInfo | URL,
  init?: RequestInit
): TaskEither<FetchError, Response> =>
  tryCatch(
    async () => {
      const res = await fetch(input, init);

      if (!res.ok) {
        let body: unknown;
        try {
          body = await res.clone().json();
        } catch {
          body = await res.text().catch(() => undefined);
        }

        throw {
          _tag: "HttpError" as const,
          status: res.status,
          message: res.statusText,
          cause: undefined,
        } as HttpError;
      }

      return res;
    },
    (err) =>
      ({
        _tag: "NetworkError",
        cause: err instanceof Error ? err : new Error(String(err)),
      } as NetworkError)
  );
