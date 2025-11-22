import { memo, useEffect } from "react";
import { useBackground, type Meteor, type Star } from "./useBackground";

type BackgroundProps = {
  starDensity: number;
  meteorNumber: number;
};

const StarDiv = memo(({ star }: { star: Star }) => (
  <div
    className="star animate-pulse-subtle"
    style={{
      width: star.size + "px",
      height: star.size + "px",
      left: star.x + "%",
      top: star.y + "%",
      opacity: star.opacity,
      animationDuration: star.animationDuration + "s",
    }}
  />
));

const MeteorDiv = memo(({ meteor }: { meteor: Meteor }) => (
  <div
    className="meteor animate-meteor"
    style={{
      width: meteor.size * 10 + "px",
      height: meteor.size + "px",
      left: meteor.x + "%",
      top: meteor.y + "%",
      animationDelay: /*meteor.delay*/ 0 + "s",
      animationDuration: meteor.animationDuration + "s",
    }}
  />
));



export const Background = ({ starDensity, meteorNumber }: BackgroundProps) => {


  const { starsIO, meteorsIO, generateBackground } = useBackground();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      generateBackground(width, height, starDensity, meteorNumber)();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [generateBackground]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {starsIO().map((star) => (
        <StarDiv key={star.id} star={star} />
      ))}
      {meteorsIO().map((meteor) => (
        <MeteorDiv key={meteor.id} meteor={meteor} />
      ))}
    </div>
  );
};
