import { SuperForces } from "../../hooks/useSuperForces";
import styles from "./SuperForce.module.css";
import cn from "classnames";

const images = require.context("./", true);

const backgroundImageUrl = images("./images/background.svg");

export const SuperForce = ({ id, count, onClick }) => {
  const superForce = SuperForces[id];

  return (
    <div className={cn(styles.container, { [styles.disabled]: !count })} onClick={onClick}>
      <img src={backgroundImageUrl} className={styles.containerBackground} alt="" />
      <img src={images(superForce.imageUrl)} alt={superForce.name} />
      <div className={styles.pictogramContainer}>
        <div className={styles.pictogram}>{count}</div>
      </div>
    </div>
  );
};
