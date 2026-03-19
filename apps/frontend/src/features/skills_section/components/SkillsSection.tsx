import { SectionTitle } from "@shared/components/section_titile/SectionTitle";
import TagFilterBar from "@shared/components/tag_filter_bar/TagFilterBar";
import { useSkills } from "../hooks/useSkills";
import { useSkillTags } from "../hooks/useSkillTags";
import { matchError } from "@shared/errors/errorHandler";
import type { Skill } from "../models/Skill.model";
import React, { useState } from "react";

type SkillCardProps = { skill: Skill; highlight?: boolean };

const SkillCard: React.FC<SkillCardProps> = ({ skill, highlight }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg card-hover ${
        highlight ? "bg-primary" : "bg-card"
      }`}
    >
      <div className="text-left mb-4">
        <h3 className="font-semibold text-lg">{skill.title}</h3>
      </div>
      <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full origin-left animate-[grow_1.5s_ease-out] ${
            highlight ? "bg-foreground" : "bg-primary"
          }`}
          style={{ width: skill.level + "%" }}
        />
      </div>
      <div className="text-right mt-1 text-sm text-muted-foreground">
        <span>{skill.level}%</span>
      </div>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const { matchSkills, getAllSkills, getSkillsByTag } = useSkills();
  const { matchTags } = useSkillTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onClear = () => {
    setSelectedTags([]);
    getAllSkills();
  };

  const loadingDisplay = (message: string) => (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );

  const errorDisplay = (mssg: string, error: string) => (
    <div className="mb-6">
      <p className="text-sm text-destructive">
        {mssg} : {error}
      </p>
    </div>
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl ">
        <SectionTitle text_white="My" text_primary="Skills" />
        {matchTags({
          Idle: () => loadingDisplay("Loading tags..."),
          Loading: () => loadingDisplay("Loading tags..."),
          Error: (error) =>
            matchError(error, {
              NetworkError: (error) =>
                errorDisplay(
                  "NetworkError while loading tags",
                  error.cause.message
                ),
              HttpError: (error) =>
                errorDisplay(
                  "HttpError while loading tags",
                  error.status.toString()
                ),
              ParseError: (error) =>
                errorDisplay("ParseError while loading tags", error.message),
              ValidationError: (error) =>
                errorDisplay(
                  "ValidationError while loading tags",
                  error.cause?.toString() || ""
                ),
            }),
          Success: (tags) => (
            <TagFilterBar
              tags={tags}
              onSelectionChange={(tags) => {
                setSelectedTags(tags.map(t => t.label));
                getSkillsByTag(tags);
              }}
              onClear={onClear}
            />
          ),
        })}

        {matchSkills({
          Idle: () => loadingDisplay("Loading skills..."),
          Loading: () => loadingDisplay("Loading skills..."),
          Error: (error) =>
            matchError(error, {
              NetworkError: (error) =>
                errorDisplay(
                  "NetworkError while loading skills",
                  error.cause.message
                ),
              HttpError: (error) =>
                errorDisplay(
                  "HttpError while loading skills",
                  error.status.toString()
                ),
              ParseError: (error) =>
                errorDisplay("ParseError while loading skills", error.message),
              ValidationError: (error) =>
                errorDisplay(
                  "ValidationError while loading skills",
                  error.cause?.toString() || ""
                ),
            }),
          Success: (skills) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {skills.map((skill, index) => {
                const highlight = skill.tags.some(tag =>
                  selectedTags.includes(tag)
                );
                return <SkillCard key={index} skill={skill} highlight={highlight} />;
              })}
            </div>
          ),
        })}
      </div>
    </section>
  );
};