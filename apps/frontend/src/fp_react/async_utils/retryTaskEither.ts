import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

export const retryTaskEither = <E, A>(
  task: TE.TaskEither<E, A>,
  retries: number,
  delayMs: number = 0
): TE.TaskEither<E, A> => {
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const attempt =
    (n: number): TE.TaskEither<E, A> =>
    () =>
      task().then((result) =>
        E.match<E, A, Promise<E.Either<E, A>>>(
          async (err) => {
            if (n > 0) {
              await wait(delayMs);
              return attempt(n - 1)();
            } else {
              return E.left(err);
            }
          },
          (value) => Promise.resolve(E.right(value))
        )(result)
      );

  return attempt(retries);
};
