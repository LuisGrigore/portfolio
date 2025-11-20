import React, { useState } from "react";
import type { ProjectTag } from "@models/projectTag.model";

type TagFilterBarProps = {
  tags: readonly ProjectTag[];
  onSelectionChange?: (selectedTags: ProjectTag[]) => void;
  onClear?: () => void;
};

const TagFilterBar: React.FC<TagFilterBarProps> = ({
  tags,
  onSelectionChange,
  onClear,
}) => {
  const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([]);

  const toggle = (tag: ProjectTag) => {
    const next = selectedTags.some((x) => x.id === tag.id)
      ? selectedTags.filter((x) => x.id !== tag.id)
      : [...selectedTags, tag];

    setSelectedTags(next);
    onSelectionChange?.(next);
  };

  const clear = () => {
    setSelectedTags([]);
    if (onSelectionChange) onSelectionChange([]);
    onClear?.();
  };

  return (
	 <div className="mb-6 flex flex-wrap items-center gap-3">
         {tags.map((t) => {
          const active = selectedTags.includes(t);
          return (
            <button
              key={t.id}
              onClick={() => toggle(t)}
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
          onClick={clear}
          className="ml-2 px-3 py-1 rounded-full text-sm text-muted-foreground border border-dashed"
        >
          Clear
        </button>
      </div>
  );
};

export default TagFilterBar;
