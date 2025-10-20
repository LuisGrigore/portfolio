import React from "react";
import { Briefcase, Code, User } from "lucide-react";

const Title: React.FC = () => {
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      About <span className="text-primary">Me</span>
    </h2>
  );
};

const FirstSection: React.FC = () => {
  return (
    <div className="space-y-6 ">
      <h3 id="about-title" className="text-2xl font-semibold">
        Passionate and experienced developer.
      </h3>
      <p className="text-muted-foreground">
        Soy desarrollador frontend con 5 años de experiencia creando interfaces
        accesibles y rendimiento optimizado. Me apasiona convertir diseños en
        experiencias interactivas y escalables.
      </p>
      <p className="text-muted-foreground">
        Trabajo con React, TypeScript y Tailwind CSS. He colaborado en productos
        desde la fase de prototipado hasta el despliegue, priorizando usabilidad
        y mantenibilidad.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#contact" className="cosmic-button">
          Get In Touch
        </a>
        <a
          href="/assets/LuisGrigore_CV.pdf"
          download
          className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
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
const SkillSection: React.FC<SkillSectionProps> = React.memo(
  ({ skill }) => {
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
  }
);

const SKILLS: Skill[] = [
  {
    icon: <Code className="text-primary w-6 h-6" />,
    name: "Web",
    description: "Frontend development, frameworks and tooling.",
  },
  {
    icon: <User className="text-primary w-6 h-6" />,
    name: "UX",
    description: "Design thinking and user-centered interfaces.",
  },
  {
    icon: <Briefcase className="text-primary w-6 h-6" />,
    name: "Business",
    description: "Product & project experience.",
  },
];

const SecondSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 ">
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
      className="px-4 md:px-24 py-8 relative"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto max-w-5xl ">
        <Title />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FirstSection />
          <SecondSection />
        </div>
      </div>
    </section>
  );
};
