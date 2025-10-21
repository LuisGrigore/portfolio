import { AboutMeSection } from "../components/about_me_section/AboutMeSection";
import { Background } from "../components/background/Background";
import { ContactSection } from "../components/contact_section/ContactSection";
import { HeroSection } from "../components/hero_section/HeroSection";
import { Navbar } from "../components/navbar/Navbar";
import { ProjectsSection } from "../components/projects_section/ProjectsSection";
import { SkillsSection } from "../components/skills_section/SkillsSection";
import { ThemeToggle } from "../components/theme_toggle/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/*Theme toggle*/}
      <div className="fixed max-sm:hidden top-5 right-5 z-50 p-2 ">
        <ThemeToggle />
      </div>

      {/*Background*/}
      <Background starDensity={0.0001} meteorNumber={4} />

      {/*Nav Bar*/}
      <Navbar />

      {/*Body*/}
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

      {/*Footer*/}
    </div>
  );
}
