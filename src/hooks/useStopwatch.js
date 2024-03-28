import { useState, useEffect } from "react";

export const useStopwatch = ({ resolution = 1000 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerId, setTimerId] = useState();
  const [startTime, setStartTime] = useState();
  const [tick, setTick] = useState();

  useEffect(() => {
    if (isRunning) {
      setStartTime(new Date());
      setTimerId(
        setInterval(() => {
          setTick(new Date());
        }, resolution),
      );
      return () => clearInterval(timerId);
    } else {
      setStartTime(null);
      clearInterval(timerId);
    }
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    if (startTime) {
      setTimeElapsed(c => c + (new Date() - startTime));
    }
    setIsRunning(false);
  };

  const reset = () => {
    setTimeElapsed(0);
    setIsRunning(false);
  };

  const getElapsed = () => {
    const duration = timeElapsed + (startTime ? new Date() - startTime : 0);
    return {
      totalMilliseconds: duration,
      totalSeconds: Math.floor(duration / 1000),
      milliseconds: duration % 1000,
      seconds: Math.floor(duration / 1000) % 60,
      minutes: Math.floor(duration / 60000),
    };
  };

  return { start, stop, reset, getElapsed, isRunning, tick };
};
