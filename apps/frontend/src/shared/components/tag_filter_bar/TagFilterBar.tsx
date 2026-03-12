import React, { useState } from "react";
import type { TagFilter } from "@shared/models/TagFilter.model";

type TagFilterBarProps = {
  tags: readonly TagFilter[];
  onSelectionChange?: (selectedTags: TagFilter[]) => void;
  onClear?: () => void;
};

const TagFilterBar: React.FC<TagFilterBarProps> = ({
  tags,
  onSelectionChange,
  onClear,
}) => {
  const [selectedTags, setSelectedTags] = useState<TagFilter[]>([]);

  const toggle = (tag: TagFilter) => {
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
	 <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
         {tags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag.id}
              onClick={() => toggle(tag)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors border touch-none ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground/80 border-border"
              }`}
            >
              {tag.label}
            </button>
          );
        })}

        <button
          onClick={clear}
          className="ml-1 sm:ml-2 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-muted-foreground border border-dashed touch-none"
        >
          Clear
        </button>
      </div>
  );
};

export default TagFilterBar;
