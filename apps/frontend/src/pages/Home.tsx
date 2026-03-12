import { AboutMeSection } from "@features/about_section";
import { ContactSection } from "@features/contact_section";
import { ProjectsSection } from "@features/project_section";
import { SkillsSection } from "@features/skills_section";
import { Background } from "@shared/components/background/Background";
import { HeroSection } from "@features/hero_section/HeroSection";
import { Navbar } from "@shared/components/navbar/Navbar";


import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// import fragmentShader from "./fragment.glsl?raw";
import fragmentShader from "./fragment_p.glsl?raw";
import vertexShader from "./vertex.glsl?raw";

const GradientMaterialA = shaderMaterial(
  {
	uTime: 0,
	uAspect: 1.0, // <- añade esto
	uColors: [
	  new THREE.Color("#130437"),
	  new THREE.Color("#B34BD0"),
	  new THREE.Color("#210751"),
	  new THREE.Color("#3511A5"),
	],
	uPressure: new THREE.Vector2(7 / 4, 3 / 4),
	uBlending: 9 / 10,
	uYOffset: 21319 * (4.8 / 1000),
	uFlowScale: 3.3,
	uFlowEase: 0.37,
	uFlowDistA: 0.4,
	uFlowDistB: 10.0,
	uShadows: 4 / 100,
	uBrightness: 1.95,
	uSaturation: 2 / 10,
	uGrainScale: 6.0,
	uGrainIntensity: 0.125,
	uGrainSparsity: 0.0,
	uGrainSpeed: 0.0,
	uDensity: 0.7, // cuántas partículas aparecen (0-1)
	uParticleSize: 0.05, // tamaño base
	uGlowStrength: 1.5, // intensidad del halo
	uGridSize: 120.0,
  },
  vertexShader,
  fragmentShader,
);
extend({ GradientMaterialA });
declare module "@react-three/fiber" {
  interface ThreeElements {
	gradientMaterialA: any;
  }
}

function BackgroundPlane() {
  const material = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
	if (material.current) {
	  material.current.uTime = state.clock.elapsedTime * 0.2;
	  material.current.uAspect = viewport.width / viewport.height;
	}
  });

  return (
	<mesh scale={[viewport.width, viewport.height, 1]}>
	  <planeGeometry args={[1, 1]} /> {/* <- 1,1 es suficiente */}
	  <gradientMaterialA ref={material} transparent />
	</mesh>
  );
}
const GeneralBackground = () => {
  return (
	<Canvas
	  orthographic
	  camera={{ position: [0, 0, 1] }}
	  dpr={[1, 2]}
	  style={{
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: -1,
	  }}
	>
	  <BackgroundPlane />
	</Canvas>
  );
};

export const Home:React.FC = () =>{
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden relative">
      {/* <Background starDensity={0.0001} meteorNumber={4} /> */}
	  
      <div className="relative z-50">
        <Navbar />
      </div>
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll relative">
        <div className="snap-start h-screen">
          <HeroSection />
        </div>
        <div className="snap-start min-h-screen relative">
          <GeneralBackground/>
          <div className="h-full overflow-y-auto pt-30 relative z-10">
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
