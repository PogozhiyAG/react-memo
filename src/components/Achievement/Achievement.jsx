import { Acheivements } from "../../hooks/useAchievements";

const images = require.context("./", true);

export const Achievement = ({ id, active = true, className }) => {
  const achievment = Acheivements[id];
  return (
    <img
      src={images(active ? achievment.activeImageUrl : achievment.inactiveImageUrl)}
      alt={achievment.name}
      className={className}
    />
  );
};
