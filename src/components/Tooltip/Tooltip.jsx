import { useEffect, useRef } from "react";
import styles from "./Tooltip.module.css";
import { useTooltip } from "./useTooltip";

export const Tooltip = ({ children, elementRef }) => {
  const tooltipRef = useRef(null);
  const tooltip = useTooltip({ tooltipRef, elementRef });

  useEffect(() => {
    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", tooltip.onMouseEnter);
      element.addEventListener("mouseleave", tooltip.onMouseLeave);
    }
    return () => {
      if (element) {
        element.removeEventListener("mouseenter", tooltip.onMouseEnter);
        element.removeEventListener("mouseleave", tooltip.onMouseLeave);
      }
    };
  }, [elementRef, tooltip.onMouseEnter, tooltip.onMouseLeave]);

  if (!tooltip.isVisible) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={styles.container}
      style={{ top: tooltip.position.bottom + 5, left: tooltip.position.left + 15 }}
    >
      {children}
    </div>
  );
};
