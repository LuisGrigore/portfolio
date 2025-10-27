import { Star } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
};

export type Meteor = {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  animationDuration: number;
};

const generateStars = (starDensity: number): Star[] => {
  const starNumber = Math.floor(
    window.innerWidth * window.innerHeight * starDensity
  );
  const newStars: Star[] = Array.from({ length: starNumber }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.5,
    animationDuration: Math.random() * 4 + 2,
  }));
  return newStars;
};

const generateMeteors = (meteorNumber: number): Meteor[] => {
  const newMeteors: Meteor[] = Array.from({ length: meteorNumber }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 70,
    delay: Math.random() * 15,
    animationDuration: Math.random() * 3 + 3,
  }));
  return newMeteors;
};

export const useBackground = (
  starDensity: number,
  meteorNumber: number
): { readonly stars: Star[]; readonly meteors: Meteor[] } => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  const generateBackground = useCallback(() => {
    setStars(generateStars(starDensity));
    setMeteors(generateMeteors(meteorNumber));
  }, [starDensity, meteorNumber]);

  useEffect(() => {
    generateBackground();
    window.addEventListener("resize", generateBackground);
    return () => window.removeEventListener("resize", generateBackground);
  }, [generateBackground]);

  return { stars, meteors };
};
