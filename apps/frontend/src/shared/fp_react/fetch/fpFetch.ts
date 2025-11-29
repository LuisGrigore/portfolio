import { tryCatch, type TaskEither } from "fp-ts/TaskEither";
import type { HttpError, NetworkError } from "../errors/networkErrors";

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
          try {
            body = await res.text();
          } catch {
            body = undefined;
          }
        }
        throw {
          _tag: "HttpError",
          status: res.status,
          message: res.statusText,
          cause: undefined,
        } as HttpError;
      }

      return res;
    },
    (err) => {
		console.log(err);
      if (
        err &&
        typeof err === "object" &&
        "_tag" in err &&
        err._tag === "HttpError"
      ) {
        return err as HttpError;
      }
      return <NetworkError>{
        _tag: "NetworkError",
        cause: err instanceof Error ? err : new Error(String(err)),
      };
    }
  );
