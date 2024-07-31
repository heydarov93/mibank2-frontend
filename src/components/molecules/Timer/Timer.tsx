import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { convertSecondsToTime } from 'utils';

interface TimerProps {
  time: number;
  endTime: number;
  runTimer: Dispatch<SetStateAction<boolean>>;
  setTime?: Dispatch<SetStateAction<number>>;
  hasResendBtn?: boolean;
}

export const Timer = ({
  time,
  endTime,
  runTimer,
  setTime,
  hasResendBtn,
}: TimerProps) => {
  const { t } = useTranslation('translation');

  const [remainingTime, setRemainingTime] = useState<number>(time);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = endTime - Date.now();
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timer);
        runTimer(false);
        setTime && setTime(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, runTimer]);

  const remainingTimeLabel = convertSecondsToTime(
    Math.ceil(remainingTime / 1000),
  );

  const timeLabelResend =
    remainingTime > 0
      ? ` ${t('VerificationPage.resendCodeIn')} ${convertSecondsToTime(Math.ceil(remainingTime / 1000))}`
      : t('VerificationPage.resendCode');

  return <span>{hasResendBtn ? timeLabelResend : remainingTimeLabel}</span>;
};
