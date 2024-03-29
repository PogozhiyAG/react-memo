import { useAchievements } from "../../hooks/useAchievements";

const images = require.context("./", true);

export const Achievement = ({ id, active = true, className }) => {
  const achievements = useAchievements();
  const achievment = achievements[id];

  return (
    <img
      src={images(active ? achievment.activeImageUrl : achievment.inactiveImageUrl)}
      alt={achievment.name}
      className={className}
    />
  );
};
