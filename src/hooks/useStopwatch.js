import { useRef } from "react";
import { useState, useEffect } from "react";

export const useStopwatch = ({ resolution = 1000 }) => {
  const intervalId = useRef();
  const timeElapsed = useRef(0);
  const startTime = useRef();
  const [tick, setTick] = useState();

  useEffect(() => clearInterval(intervalId.current), []);

  const start = () => {
    if (intervalId.current) {
      return;
    }
    startTime.current = new Date();
    intervalId.current = setInterval(() => setTick(new Date()), resolution);
  };

  const stop = () => {
    if (!intervalId.current) {
      return;
    }
    clearInterval(intervalId.current);
    intervalId.current = null;
    timeElapsed.current = timeElapsed.current + (new Date() - startTime.current);
  };

  const reset = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    timeElapsed.current = 0;
  };

  const getElapsed = () => {
    const duration = timeElapsed.current + (intervalId.current ? new Date() - startTime.current : 0);
    return {
      totalMilliseconds: duration,
      totalSeconds: Math.floor(duration / 1000),
      milliseconds: duration % 1000,
      seconds: Math.floor(duration / 1000) % 60,
      minutes: Math.floor(duration / 60000),
    };
  };

  return { start, stop, reset, getElapsed, tick };
};
