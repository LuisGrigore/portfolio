import * as TE from "fp-ts/TaskEither";
import { useCallback } from "react";
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

export type AsyncMatch<E, A, R> = {
  Idle: () => R;
  Loading: () => R;
  Error: (error: E) => R;
  Success: (data: A) => R;
};

export const useAsync = <E, A>() => {
  const [state, setState] = useStable<AsyncState<E, A>>(
    { _tag: "Idle" },
    eqAsyncState<E, A>()
  );

  const runTask = useCallback((task: TE.TaskEither<E, A>) => {
    setState({ _tag: "Loading" });
    task().then(
      E.match(
        (error) => setState({ _tag: "Error", error }),
        (data) => setState({ _tag: "Success", data })
      )
    );
  },[]);

  const match = useCallback(<R>(matcher: AsyncMatch<E, A, R>): R => {
    switch (state._tag) {
      case "Idle":
        return matcher.Idle();
      case "Loading":
        return matcher.Loading();
      case "Error":
        return matcher.Error(state.error);
      case "Success":
        return matcher.Success(state.data);
    }
  },[state]);

  return [ match, runTask ] as const;
};

