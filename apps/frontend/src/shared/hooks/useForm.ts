import { pipe } from "fp-ts/lib/function";

export const useForm = <T extends Record<string, any>>(
  onSubmit: (values: T) => void
) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pipe(
      new FormData(e.currentTarget),
      Object.fromEntries,
      (entries) => entries as T,
      onSubmit
    );
  };
  return { handleSubmit };
};