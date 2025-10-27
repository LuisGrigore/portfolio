import { useBackground } from "./useBackground";

type BackgroundProps = {
  starDensity: number;
  meteorNumber: number;
};

export const Background = ({ starDensity, meteorNumber }: BackgroundProps) => {
  const {stars, meteors} = useBackground(starDensity, meteorNumber);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
			top: star.y + "%",
			opacity: star.opacity,
			animationDuration: star.animationDuration + "s"
          }}
        />
      ))}
	  {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 10 + "px",
            height: meteor.size + "px",
            left: meteor.x + "%",
			top: meteor.y + "%",
			animationDelay: meteor.delay + "s",
			animationDuration: meteor.animationDuration + "s"
          }}
        />
      ))}
    </div>
  );
};
