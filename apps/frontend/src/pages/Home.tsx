import { AboutMeSection } from "@features/about_section";
import { ContactSection } from "@features/contact_section";
import { ProjectsSection } from "@features/project_section";
import { SkillsSection } from "@features/skills_section";
import { Background } from "@shared/components/background/Background";
import { HeroSection } from "@shared/components/hero_section/HeroSection";
import { Navbar } from "@shared/components/navbar/Navbar";


export const Home:React.FC = () =>{
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Background starDensity={0.0001} meteorNumber={4} />
      <Navbar />
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <div className="snap-start h-screen">
          <HeroSection />
        </div>
        <div className="snap-start min-h-screen">
          <div className="h-full overflow-y-auto pt-30">
            <AboutMeSection />
            <SkillsSection />
            <ProjectsSection />
			<ContactSection />
          </div>
        </div>
      </main>
    </div>
  );
}
