import { ArrowDown } from "lucide-react";

const Title = () => {
  return (
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
      <span className="opacity-0 animate-fade-in">Hi, I'm </span>
      <span className="text-primary opacity-0 animate-fade-in-delay-1">
        Luis{" "}
      </span>
      <span className="text-gradient text-primary opacity-0 animate-fade-in-delay-2">
        Grigore.
      </span>
    </h1>
  );
};

const Paragraph = () => {
  return (
    <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
      Introduction parragraph.
    </p>
  );
};

const ViewWorkButton = () => {
  return (
    <div className=" opacity-0 animate-fade-in-delay-4 pt-4">
      <a href="projects" className="cosmic-button">
        View My Work
      </a>
    </div>
  );
};

const ScrollHint = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
      <span className="text-sm text-muted-foreground mb-2">Scroll</span>
      <ArrowDown className="h-5 w-5 text-primary" />
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 "
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div>
          <Title />
          <Paragraph />
          <ViewWorkButton />
        </div>
      </div>
      <ScrollHint />
    </section>
  );
};
