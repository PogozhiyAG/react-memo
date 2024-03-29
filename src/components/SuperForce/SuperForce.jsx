import { useRef } from "react";
import { useSuperForces } from "../../hooks/useSuperForces";
import { Tooltip } from "../Tooltip/Tooltip";
import styles from "./SuperForce.module.css";
import cn from "classnames";

const images = require.context("./", true);

const backgroundImageUrl = images("./images/background.svg");

export const SuperForce = ({ id, count, onClick }) => {
  const superForces = useSuperForces();
  const superForce = superForces[id];
  const containerRef = useRef();

  return (
    <>
      <Tooltip elementRef={containerRef}>
        <b>{superForce.name}</b>
        <div>{superForce.description}</div>
      </Tooltip>

      <div ref={containerRef} className={cn(styles.container, { [styles.disabled]: !count })} onClick={onClick}>
        <img src={backgroundImageUrl} className={styles.containerBackground} alt="" />
        <img src={images(superForce.imageUrl)} alt={superForce.name} />
        <div className={styles.pictogramContainer}>
          <div className={styles.pictogram}>{count}</div>
        </div>
      </div>
    </>
  );
};
