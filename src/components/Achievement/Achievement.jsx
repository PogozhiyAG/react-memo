import { useRef } from "react";
import { useAchievements } from "../../hooks/useAchievements";
import { Tooltip } from "../Tooltip/Tooltip";

const images = require.context("./", true);

export const Achievement = ({ id, active = true, className }) => {
  const achievements = useAchievements();
  const achievment = achievements[id];
  const imageRef = useRef();

  return (
    <>
      {active && <Tooltip elementRef={imageRef}>{achievment.name}</Tooltip>}
      <img
        ref={imageRef}
        src={images(active ? achievment.activeImageUrl : achievment.inactiveImageUrl)}
        alt={achievment.name}
        className={className}
      />
    </>
  );
};
