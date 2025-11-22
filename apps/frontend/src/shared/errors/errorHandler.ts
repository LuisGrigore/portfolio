
export type ErrMatcher<E extends { _tag: string }> = {
  [T in E["_tag"]]: (err: Extract<E, { _tag: T }>) => any;
};


export const matchError = <E extends { _tag: string }>(
  err: E,
  matcher: ErrMatcher<E>
): any => {
  type Tag = E["_tag"];
  const fn = matcher[err._tag as Tag] as (e: typeof err) => any;
  return fn(err);
}
