import { t } from 'i18next';

export const getDaysDiff = (endDate: string, startDate: string): number => {
  const dateEnd = new Date(endDate);
  const dateStart = new Date(startDate);
  if (isNaN(dateEnd.getTime()) || isNaN(dateStart.getTime())) {
    throw new Error(`Invalid date argument: ${endDate} or ${startDate}`);
  }
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcEnd = Date.UTC(
    dateEnd.getFullYear(),
    dateEnd.getMonth(),
    dateEnd.getDate(),
  );
  const utcStart = Date.UTC(
    dateStart.getFullYear(),
    dateStart.getMonth(),
    dateStart.getDate(),
  );
  return Math.abs(utcEnd - utcStart) / msPerDay;
};

export const formatDaysToMonths = (days: number): string => {
  const rightNumber = days >= 30 ? Math.floor(days / 30) : days;
  const unit = `${days >= 30 ? 'month' : 'day'}`;
  return t(`Homepage.sidebar.myDeposits.time.${unit}`, {
    count: rightNumber,
    ns: 'translation',
  });
};
