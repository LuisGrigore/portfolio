import type { ValidationError } from "@shared/errors/validationErrors";
import { taskEitherWithBackoff } from "../async_utils/retryTaskEither";
import type { ParseError } from "../errors";
import type { HttpError, NetworkError } from "../errors/networkErrors";
import { fpFetchJson } from "./fpFetchJson";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

export type GetResourceError =
  | NetworkError
  | HttpError
  | ParseError
  | ValidationError;

export type BackoffConfig = { retries: number; delay: number; factor: number };

export const getResourceFromEndpoint = <A, D>(
  url: string,
  validationSchema: t.Type<D>,
  modelMapper: (dto: D) => A,
  backoffConfig: BackoffConfig
): TE.TaskEither<GetResourceError, A> =>
  taskEitherWithBackoff(
    pipe(
      fpFetchJson(url),
      TE.chain((data) =>
        pipe(
          TE.fromEither(validationSchema.decode(data)),
          TE.mapLeft(
            (error) =>
              ({
                _tag: "ValidationError",
                cause: error,
              } as GetResourceError)
          )
        )
      ),
      TE.map((dto) => modelMapper(dto))
    ),
    backoffConfig.retries,
    backoffConfig.delay,
    backoffConfig.factor
  );