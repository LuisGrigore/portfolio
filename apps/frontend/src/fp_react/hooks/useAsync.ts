import * as TE from "fp-ts/TaskEither";
import { useEffect } from "react";
import { useStable } from "fp-ts-react-stable-hooks";
import * as Eq from "fp-ts/Eq";
import * as E from "fp-ts/Either";

export type AsyncState<E, A> =
  | { _tag: "Idle" }
  | { _tag: "Loading" }
  | { _tag: "Error"; error: E }
  | { _tag: "Success"; data: A };

const eqAsyncState = <E, A>(): Eq.Eq<AsyncState<E, A>> =>
  Eq.fromEquals((x, y) => {
    if (x._tag !== y._tag) return false;

    switch (x._tag) {
      case "Idle":
      case "Loading":
        return true;
      case "Error":
        return x.error === (y as { _tag: "Error"; error: E }).error;
      case "Success":
        return x.data === (y as { _tag: "Success"; data: A }).data;
    }
  });

export const useAsync = <E, A>() => {
  const [state, setState] = useStable<AsyncState<E, A>>(
    { _tag: "Idle" },
    eqAsyncState<E, A>()
  );

  const performe = (task: TE.TaskEither<E, A>) => {
    setState({ _tag: "Loading" });
    task().then((result) =>
      E.match<E, A, void>(
        (error) => setState({ _tag: "Error", error }),
        (data) => setState({ _tag: "Success", data })
      )(result)
    );
  };
  return [state, performe] as const;
};

export const useAsyncOnce = <E, A>(task: TE.TaskEither<E, A>) => {
  const [state, performe] = useAsync<E, A>();

  useEffect(() => {
    performe(task);
  }, [task]);
  return state;
};

