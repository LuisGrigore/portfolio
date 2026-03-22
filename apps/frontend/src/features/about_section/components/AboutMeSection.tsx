import React from "react";
import { Brain, TrendingUp, Users } from "lucide-react";
import { SectionTitle } from "@shared/components/section_titile/SectionTitle";
import paragraph from "../content/paragraph.md?raw";
import { MarkdownRenderer } from "@shared/components/markdown_renderer/MarkdownRenderer";

const FirstSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <MarkdownRenderer textDir="left">{paragraph}</MarkdownRenderer>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
        <a href="#contact" className="cosmic-button text-center">
          Get In Touch
        </a>
        <a
          href="/assets/LuisGrigore_CV.pdf"
          download
          className="px-4 sm:px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center text-sm sm:text-base"
          aria-label="Download CV"
        >
          Download CV
        </a>
      </div>
    </div>
  );
};

type Skill = {
  icon: React.ReactNode;
  name: string;
  description: string;
};

type SkillSectionProps = { skill: Skill };
const SkillSection: React.FC<SkillSectionProps> = React.memo(({ skill }) => {
  const { icon, name, description } = skill;
  return (
    <div className="gradient-border p-6 card-hover">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="text-left">
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
});

const SKILLS: Skill[] = [
  {
    icon: <Brain className="text-primary w-6 h-6" />,
    name: "Problem Solving",
    description: "Analytical mindset with experience tackling complex programming and system-level challenges.",
  },
  {
    icon: <Users className="text-primary w-6 h-6" />,
    name: "Teamwork",
    description: "Used to collaborative environments and peer-reviewed projects, especially at 42 Madrid.",
  },
  {
    icon: <TrendingUp className="text-primary w-6 h-6" />,
    name: "Continuous Learning",
    description: "Motivated to constantly improve, learn new technologies and grow as a developer.",
  },
];

const SecondSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {SKILLS.map((skill, indx) => (
        <SkillSection key={indx} skill={skill} />
      ))}
    </div>
  );
};

export const AboutMeSection: React.FC = () => {
  return (
    <section
      id="about"
      className="px-3 sm:px-4 md:px-8 lg:px-24 py-16 sm:py-20 md:py-24 relative"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto max-w-5xl">
        <SectionTitle text_white="About" text_primary="Me" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FirstSection />
          <SecondSection />
        </div>
      </div>
    </section>
  );
};
