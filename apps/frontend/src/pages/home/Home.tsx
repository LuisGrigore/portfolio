import { AboutMeSection } from "@features/about_section";
import { ContactSection } from "@features/contact_section";
import { ProjectsSection } from "@features/project_section";
import { SkillsSection } from "@features/skills_section";
import { HeroSection } from "@features/hero_section/HeroSection";
import { Navbar } from "@features/navbar/Navbar";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

import fragmentShader from "./shaders/fragment_p.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";
import { Feedback } from "@features/feedback";

const GradientMaterialA = shaderMaterial(
  {
    uTime: 0,
    uAspect: 1.0,
    uColors: [
      new THREE.Color("#130437"),
      new THREE.Color("#B34BD0"),
      new THREE.Color("#210751"),
      new THREE.Color("#3511A5"),
    ],
    uGridSize: 90.0,
    uDensity: 0.52,
    uParticleSize: 0.07,
    uSpeed: 0.7,
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
      material.current.uTime = state.clock.elapsedTime * 2.0;
      material.current.uAspect = viewport.width / viewport.height;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <gradientMaterialA ref={material} transparent />
    </mesh>
  );
}
const GeneralBackground = () => {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1] }}
      dpr={[1, 1]}
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

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden relative">
      <div className="relative z-50">
        <Navbar />
      </div>
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll relative">
        <div className="snap-start h-screen">
          <HeroSection />
        </div>
        <div className="snap-start min-h-screen relative">
          <GeneralBackground />
          <div className="h-full pt-30 relative z-10">
            <AboutMeSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Feedback />
    </div>
  );
};
