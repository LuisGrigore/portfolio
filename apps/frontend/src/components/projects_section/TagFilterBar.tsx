import React from "react";
import type { ProjectTag } from "@models/projectTag.model";
import type { GetResourceError } from "@services/project.service";
import { useProjectTags } from "@hooks/useProjectTags";
import type { HttpError, NetworkError } from "fp_react/errors/networkErrors";
import type { ValidationError } from "errors/validationErrors";
import type { ParseError } from "fp_react/errors/parseErrors";

type Props = {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
};

type MatchTagErrors = {
  NetworkError: (error: NetworkError) => any;
  HttpError: (error: HttpError) => any;
  ParseError: (error: ParseError) => any;
  ValidationError: (error: ValidationError) => any;
};

const handleTagErrors =
  (error: GetResourceError) => (match: MatchTagErrors) => {
    switch (error._tag) {
      case "NetworkError":
        return match.NetworkError(error);
      case "HttpError":
        return match.HttpError(error);
      case "ParseError":
        return match.ParseError(error);
      case "ValidationError":
        return match.ValidationError(error);
      default:
        const _exhaustiveCheck: never = error;
        return _exhaustiveCheck;
    }
  };

export const TagFilterBar: React.FC<Props> = ({
  selectedTags,
  onToggleTag,
  onClear,
}) => {
  const { matchTags } = useProjectTags();
  const loading = () => (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">Loading tags...</p>
    </div>
  );
  return matchTags({
    Idle: loading,
    Loading: loading,
    Error: (error: GetResourceError) =>
      handleTagErrors(error)({
        NetworkError: (error) => (
          <div className="mb-6">
            <p className="text-sm text-destructive">NetworkError while loading tags: {error.cause.message}</p>
          </div>
        ),
        HttpError: (error) => (
          <div className="mb-6">
            <p className="text-sm text-destructive">HttpError while loading tags: {error.message}</p>
          </div>
        ),
        ParseError: (error) => (
          <div className="mb-6">
            <p className="text-sm text-destructive">ParseError while loading tags: {error.message}</p>
          </div>
        ),
        ValidationError: (error) => (
          <div className="mb-6">
            <p className="text-sm text-destructive">ValidationError while loading tags: {error.message}</p>
          </div>
        ),
      }),
    Success: (tags: readonly ProjectTag[]) => (
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {tags.map((t) => {
          const active = selectedTags.includes(t.tag);
          return (
            <button
              key={t.id}
              onClick={() => onToggleTag(t.tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground/80 border-border"
              }`}
            >
              {t.tag}
            </button>
          );
        })}

        <button
          onClick={onClear}
          className="ml-2 px-3 py-1 rounded-full text-sm text-muted-foreground border border-dashed"
        >
          Clear
        </button>
      </div>
    ),
  });
};

export default TagFilterBar;
