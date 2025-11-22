import { SectionTitle } from "@shared/components/section_titile/SectionTitle";
import TagFilterBar from "@shared/components/tag_filter_bar/TagFilterBar";
import { useSkills } from "../hooks/useSkills";
import { useSkillTags } from "../hooks/useSkillTags";
import { matchError } from "@shared/errors/errorHandler";
import type { Skill } from "../models/Skill.model";

type SkillCardProps = { skill: Skill };

const SkillCard: React.FC<SkillCardProps> = ({ skill }: SkillCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg card-hover">
      <div className="text-left mb-4">
        <h3 className="font-semibold text-lg">{skill.name}</h3>
      </div>
      <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
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

  const onClear = () => {
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
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
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
              onSelectionChange={(tags) => getSkillsByTag(tags)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => {
                return <SkillCard key={index} skill={skill} />;
              })}
            </div>
          ),
        })}
      </div>
    </section>
  );
};
