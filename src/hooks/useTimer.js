import { useState } from "react";

export const useTimer = ({ resolution = 1000 }) => {
  const [timerId, setTimerId] = useState();
  const [accumulatedElapsed, setAccumulatedElapsed] = useState(0);
  let [startTime, setStartTime] = useState();
  const [tick, setTick] = useState();

  const updateTick = () => setTick(new Date());

  const start = () => {
    clearInterval(timerId);
    setAccumulatedElapsed(0);
    setStartTime(new Date());
    setTimerId(setInterval(updateTick, resolution));
    updateTick();
  };

  const stop = () => {
    clearInterval(timerId);
    if (startTime) {
      setAccumulatedElapsed(accumulatedElapsed + (new Date() - startTime));
    }
    setStartTime(null);
    updateTick();
  };

  const resume = () => {
    // if (startTime) {
    //   return;
    // }
    clearInterval(timerId);
    setStartTime(new Date());
    setTimerId(setInterval(updateTick, resolution));
    updateTick();
  };

  const getElapsed = () => {
    const duration = accumulatedElapsed + (startTime ? new Date() - startTime : 0);
    return {
      totalMilliseconds: duration,
      totalSeconds: Math.floor(duration / 1000),
      milliseconds: duration % 1000,
      seconds: Math.floor(duration / 1000) % 60,
      minutes: Math.floor(duration / 60000),
    };
  };

  return {
    tick,
    start,
    stop,
    resume,
    getElapsed,
  };
};
