import { SectionTitle } from "@components/section_titile/SectionTitle";
import { Category, type CategoryFilter, type Skill } from "./types";
import { useSkillCategorySelector } from "./useSkillCategorySelector";

const skills: Skill[] = [
  { name: "React", level: 90, category: Category.Frontend },
  { name: "TypeScript", level: 35, category: Category.Frontend },
  { name: "JavaScript", level: 95, category: Category.Frontend },
  { name: "HTML/CSS", level: 90, category: Category.Frontend },
  { name: "Tailwind CSS", level: 85, category: Category.Frontend },
  { name: "Node.js", level: 80, category: Category.Backend },
  { name: "Express.js", level: 75, category: Category.Backend },
  { name: "PostgreSQL", level: 50, category: Category.Backend },
  { name: "MongoDB", level: 75, category: Category.Backend },
  { name: "Docker", level: 45, category: Category.Backend },
];

type CategoryFilterProps = {
  category: CategoryFilter;
  isSelected: boolean;
  onClick: () => void;
};

const CategoryButton: React.FC<CategoryFilterProps> = ({
  category,
  isSelected,
  onClick,
}: CategoryFilterProps) => {
  return (
    <button
      className={
        "px-5 py-2 rounded-full transition-colors duration-300 capitalize" +
        (isSelected
          ? " bg-primary"
          : " bg-secondary/70 text-foreground hover:bg-secondary")
      }
      onClick={onClick}
    >
      {category}
    </button>
  );
};

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
  const { filterSkills, categories, selectedCategory, selectCategory } =
    useSkillCategorySelector();

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl ">
        <SectionTitle text_white="My" text_primary="Skills" />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, indx) => (
            <CategoryButton
              category={category}
              key={indx}
              isSelected={selectedCategory === category}
              onClick={() => selectCategory(category)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterSkills(skills).map((skill, index) => {
            return <SkillCard key={index} skill={skill} />;
          })}
        </div>
      </div>
    </section>
  );
};
