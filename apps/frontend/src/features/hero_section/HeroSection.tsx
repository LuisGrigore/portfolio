import React, { memo } from "react";
import { ArrowDown } from "lucide-react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

import fragmentShader from "./fragment.glsl?raw";
import vertexShader from "./vertex.glsl?raw";

const Title: React.FC = memo(() => {
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
});

const Paragraph: React.FC = memo(() => {
  return (
    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
      I’m a dedicated student currently pursuing a degree in Computer Science
      and Software Engineering, with a strong interest in building efficient,
      practical solutions through code. I’m also taking a C programming course,
      which has strengthened my understanding of low-level concepts and core
      programming fundamentals. I enjoy exploring new technologies, solving
      problems, and continually improving my skills as I work toward becoming a
      versatile and capable software developer.
    </p>
  );
});

const ViewWorkButton: React.FC = memo(() => {
  return (
    <div className="opacity-0 animate-fade-in-delay-4 pt-4">
      <a
        href="/projects"
        className="cosmic-button"
        aria-label="View my projects"
      >
        View My Work
      </a>
    </div>
  );
});

const ScrollHint: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
      <span className="text-sm text-muted-foreground mb-2">Scroll</span>
      <ArrowDown className="h-5 w-5 text-primary" />
    </div>
  );
};
const GradientMaterial = shaderMaterial(
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
  },
  vertexShader,
  fragmentShader,
);
extend({ GradientMaterial });
declare module "@react-three/fiber" {
  interface ThreeElements {
    gradientMaterial: any;
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
      <planeGeometry args={[1, 1]} />  {/* <- 1,1 es suficiente */}
      <gradientMaterial ref={material} />
    </mesh>
  );
}
const HeroBackground = () => {
  return (
    <Canvas
      orthographic // <- cambia perspectiva por ortográfica
      camera={{ position: [0, 0, 1] }}
      dpr={[1, 2]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <BackgroundPlane />
    </Canvas>
  );
};


export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <HeroBackground />

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

export default HeroSection;
