import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

const taskEitherWithRetryBase = <E, A>(
  task: TE.TaskEither<E, A>,
  retries: number,
  getDelay: (attempt: number) => number
): TE.TaskEither<E, A> => {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const attemptFn = (n: number): TE.TaskEither<E, A> => () =>
    task().then(result =>
      E.match<E, A, Promise<E.Either<E, A>>>(
        async (err) => {
          if (n > 0) {
            const delay = getDelay(n);
            await wait(delay);
            return attemptFn(n - 1)();
          } else {
            return E.left(err);
          }
        },
        (value) => Promise.resolve(E.right(value))
      )(result)
    );

  return attemptFn(retries);
}

export const taskEitherWithRetry = <E, A>(
  task: TE.TaskEither<E, A>,
  retries: number,
  delayMs: number = 0
): TE.TaskEither<E, A> =>
  taskEitherWithRetryBase(task, retries, () => delayMs);


export function taskEitherWithBackoff<E, A>(
  task: TE.TaskEither<E, A>,
  retries: number,
  initialDelay: number = 500,
  factor: number = 2
): TE.TaskEither<E, A> {
  return taskEitherWithRetryBase(task, retries, (attempt) => initialDelay * Math.pow(factor, retries - attempt));
}
