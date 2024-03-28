import { useCallback, useState } from "react";

export const useTimer = ({ resolution = 1000 }) => {
  const [state, setState] = useState({
    timerId: null,
    accumulatedElapsed: 0,
    startTime: null,
  });

  const [tick, setTick] = useState();

  const updateTick = () => setTick(new Date());

  const start = () => {
    setState(current => {
      clearInterval(current.timerId);
      updateTick();
      return {
        timerId: setInterval(updateTick, resolution),
        accumulatedElapsed: 0,
        startTime: new Date(),
      };
    });
  };

  const reset = () => {
    setState(current => {
      clearInterval(current.timerId);
      updateTick();
      return {
        timerId: null,
        accumulatedElapsed: 0,
        startTime: null,
      };
    });
  };

  const stop = () => {
    setState(current => {
      clearInterval(current.timerId);
      updateTick();
      return {
        timerId: null,
        accumulatedElapsed: current.accumulatedElapsed + (current.startTime ? new Date() - current.startTime : 0),
        startTime: null,
      };
    });
  };

  const resume = useCallback(() => {
    setState(current => {
      if (current.startTime) {
        return current;
      }
      clearInterval(current.timerId);
      updateTick();
      const result = {
        ...current,
        timerId: setInterval(updateTick, resolution),
        startTime: new Date(),
      };
      return result;
    });
  }, [state]);

  const getElapsed = () => {
    const duration = state.accumulatedElapsed + (state.startTime ? new Date() - state.startTime : 0);
    return {
      totalMilliseconds: duration,
      totalSeconds: Math.floor(duration / 1000),
      milliseconds: duration % 1000,
      seconds: Math.floor(duration / 1000) % 60,
      minutes: Math.floor(duration / 60000),
    };
  };

  return {
    ...state,
    tick,
    start,
    stop,
    resume,
    reset,
    getElapsed,
  };
};
