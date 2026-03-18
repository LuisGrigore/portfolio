export const errorDisplay = (msg: string, error: string) => (
  <div className="mb-6">
    <p className="text-sm text-destructive">
      {msg}: {error}
    </p>
  </div>
);
