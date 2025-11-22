import { useCallback, useState, type SetStateAction } from "react";
import * as R from "fp-ts/Random";
import * as IO from "fp-ts/IO";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { sequenceS } from "fp-ts/Apply";

export interface Star {
  readonly id: number;
  readonly size: number;
  readonly x: number;
  readonly y: number;
  readonly opacity: number;
  readonly animationDuration: number;
}

export interface Meteor {
  readonly id: number;
  readonly size: number;
  readonly x: number;
  readonly y: number;
  readonly delay: number;
  readonly animationDuration: number;
}

const randomBetween =
  (min: number, max: number): IO.IO<number> =>
  () =>
    R.random() * (max - min) + min;

const generateStars = (
  width: number,
  height: number,
  density: number
): IO.IO<readonly Star[]> =>
  pipe(
    A.makeBy(
      Math.floor(width * height * density),
      (i): IO.IO<Star> =>
        sequenceS(IO.Apply)({
          id: IO.of(i),
          size: randomBetween(1, 4),
          x: randomBetween(0, 100),
          y: randomBetween(0, 100),
          opacity: randomBetween(0.5, 1),
          animationDuration: randomBetween(2, 6),
        })
    ),
    A.sequence(IO.Applicative)
  );

const generateMeteors = (meteorNumber: number): IO.IO<readonly Meteor[]> =>
  pipe(
    A.makeBy(
      meteorNumber,
      (i): IO.IO<Meteor> =>
        sequenceS(IO.Apply)({
          id: IO.of(i),
          size: randomBetween(1, 3),
          x: randomBetween(0, 100),
          y: randomBetween(0, 70),
          delay: randomBetween(0, 15),
          animationDuration: randomBetween(3, 6),
        })
    ),
    A.sequence(IO.Applicative)
  );

interface BackgroundIO {
  readonly stars: IO.IO<readonly Star[]>;
  readonly meteors: IO.IO<readonly Meteor[]>;
}

export const createBackgroundIO = (
  width: number,
  height: number,
  starDensity: number,
  meteorNumber: number
): BackgroundIO => ({
  stars: generateStars(width, height, starDensity),
  meteors: generateMeteors(meteorNumber),
});

export function useStateIO<S>(
  initialState: S | (() => S)
): [IO.IO<S>, (newState: S | ((prev: S) => S)) => IO.IO<void>] {
  const [state, setState] = useState<S>(initialState);
  const stateIO: IO.IO<S> = () => state;
  const setIO =
    (newState: SetStateAction<S>): IO.IO<void> =>
    () =>
      setState(newState);

  return [stateIO, setIO];
}

export function useMemoStateIO<S>(
  initialState: S | (() => S)
): [IO.IO<S>, (newState: S | ((prev: S) => S)) => IO.IO<void>] {
  const [stateIO, setIO] = useStateIO<S>(initialState);
  const memoSetIO = useCallback(setIO, []);
  return [stateIO, memoSetIO];
}

export const useBackground = () => {
  const [starsIO, memoSetStarsIO] = useMemoStateIO<readonly Star[]>([]);
  const [meteorsIO, memoSetMeteorsIO] = useMemoStateIO<readonly Meteor[]>([]);

  const generateBackground = useCallback(
    (
      width: number,
      height: number,
      starDensity: number,
      meteorNumber: number
    ): IO.IO<void> =>
      pipe(
        sequenceS(IO.Apply)({
          stars: generateStars(width, height, starDensity),
          meteors: generateMeteors(meteorNumber),
        }),
        IO.chain(({ stars, meteors }) =>
          sequenceS(IO.Apply)({
            setStars: memoSetStarsIO(stars),
            setMeteors: memoSetMeteorsIO(meteors),
          })
        ),
        IO.map(() => undefined)
      ),
    [memoSetStarsIO, memoSetMeteorsIO]
  );

  return { starsIO, meteorsIO, generateBackground };
};
