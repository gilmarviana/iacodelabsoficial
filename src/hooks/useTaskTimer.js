
import { useState, useEffect, useRef, useCallback } from 'react';

const useTaskTimer = (onTick) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
            const newTime = prevTimer + 1;
            if (onTick) onTick(newTime);
            return newTime;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimer(0);
    if(onTick) onTick(0);
  }, [stopTimer, onTick]);
  
  const setTimerValue = useCallback((seconds) => {
      setTimer(seconds);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { timer, isRunning, startTimer, stopTimer, resetTimer, setTimer: setTimerValue };
};

export default useTaskTimer;
