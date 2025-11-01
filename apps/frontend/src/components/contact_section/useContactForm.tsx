import type { Message } from "../../models/message.model";
import { sendMessage } from "../../services/message.service";
import { pipe } from "fp-ts/lib/function";
import { useAsync, type AsyncState } from "../../fp_react/hooks/useAsync";


interface UseContactSection {
  state: AsyncState<unknown, unknown>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const useContactForm = () : UseContactSection => {
  const [state, runTask] = useAsync();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pipe(
      new FormData(e.currentTarget),
      Object.fromEntries,
      (values) =>
        ({
          name: String(values.name ?? ""),
          email: String(values.email ?? ""),
          content: String(values.message ?? ""),
          createdAt: new Date(),
        } as Message),
      sendMessage,
      runTask
    );
  };

  return {
    state,
    handleSubmit,
  };
};
