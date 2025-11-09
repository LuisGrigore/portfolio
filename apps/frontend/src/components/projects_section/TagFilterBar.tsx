import React from "react";
import type { AsyncState } from "../../fp_react/hooks/useAsync";
import type { ProjectTag } from "@models/projectTag.model";
import type { GetResourceError } from "@services/project.service";

type Props = {
  tags: AsyncState<GetResourceError, readonly ProjectTag[]>;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
};

export const TagFilterBar: React.FC<Props> = ({ tags, selectedTags, onToggleTag, onClear }) => {
  if (tags._tag === "Loading" || tags._tag === "Idle") {
    return (
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Loading tags...</p>
      </div>
    );
  }

  if (tags._tag === "Error") {
    return (
      <div className="mb-6">
        <p className="text-sm text-destructive">Error loading tags: {String(tags.error)}</p>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {tags.data.map((t) => {
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
  );
};

export default TagFilterBar;
