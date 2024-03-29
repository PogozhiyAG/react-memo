import { useCallback, useEffect, useState } from "react";

export const useTooltip = ({ elementRef, tooltipRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (!tooltipRef.current) {
      return;
    }

    if (isVisible) {
      const elementRect = elementRef.current.getBoundingClientRect();
      setPosition(elementRect);
    } else {
      setPosition({ bottom: 0, left: 0 });
    }
  }, [elementRef, isVisible, tooltipRef]);

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    position,
    isVisible,
    onMouseEnter,
    onMouseLeave,
  };
};
