import { AboutMeSection } from "../components/about_me_section/AboutMeSection";
import { Background } from "../components/background/Background";
import { HeroSection } from "../components/hero_section/HeroSection";
import { Navbar } from "../components/navbar/Navbar";
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
	  <Background starDensity={0.0001} meteorNumber={4}/>

      {/*Nav Bar*/}
		<Navbar />

      {/*Body*/}
		<main>
			<HeroSection />
			<AboutMeSection />
			<SkillsSection />
		</main>

      {/*Footer*/}
    </div>
  );
}
