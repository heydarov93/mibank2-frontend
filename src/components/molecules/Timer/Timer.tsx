import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { convertSecondsToTime } from 'utils';

interface TimerProps {
  time: number;
  endTime: number;
  runTimer: Dispatch<SetStateAction<boolean>>;
}

export const Timer = ({ time, endTime, runTimer }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(time);

  const remainingTimeLabel = convertSecondsToTime(
    Math.ceil(remainingTime / 1000),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = endTime - Date.now();
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timer);
        runTimer(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  return <span>{remainingTimeLabel}</span>;
};
