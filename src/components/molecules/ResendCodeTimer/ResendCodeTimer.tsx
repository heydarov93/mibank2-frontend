import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TIMER_TIMEOUT } from 'constants/ui/layout';
import { formatSecondsToTime } from 'utils/formatters';

interface ResendCodeTimerProps {
  time: number;
  endTime: number;
  runTimer: Dispatch<SetStateAction<boolean>>;
  setTime?: Dispatch<SetStateAction<number>>;
  hasResendBtn?: boolean;
}

export const ResendCodeTimer = ({
  time,
  endTime,
  runTimer,
  setTime,
  hasResendBtn,
}: ResendCodeTimerProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'VerificationPage',
  });

  const [remainingTime, setRemainingTime] = useState<number>(time);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = endTime - Date.now();
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timer);
        setTime ? setTime(0) : runTimer(false);
      }
    }, TIMER_TIMEOUT);

    return () => clearInterval(timer);
  }, [endTime, runTimer]);

  const remainingTimeLabel = formatSecondsToTime(
    Math.ceil(remainingTime / 1000),
  );

  const timeLabelResend =
    remainingTime > 0
      ? ` ${t('resendCodeIn')} ${formatSecondsToTime(Math.ceil(remainingTime / 1000))}`
      : t('resendCode');

  return <span>{hasResendBtn ? timeLabelResend : remainingTimeLabel}</span>;
};
