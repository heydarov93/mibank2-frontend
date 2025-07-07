import dayjs from 'dayjs';

import { DATE_FORMATS, LOCALES, TIME_FORMATS } from 'constants/date';



export const formatTransactionDate = (datetime: string) => {
  const date = dayjs(datetime);
  const dateStr = formatDateByPattern(datetime, DATE_FORMATS.DD_MM_YYYY);
  const timeStr = date.format(TIME_FORMATS.HH_MM);
  return { date: dateStr, time: timeStr };
};

export const formatLocaleTimeString = (dateString: string) =>
  new Date(dateString).toLocaleTimeString(LOCALES.POLISH, {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatDateByPattern = (date: Date | string, pattern: string) => dayjs(date).format(pattern);

export const formatDateByLocale = (
  date: Date | string,
  locale: string = LOCALES.ENGLISH_GB,
) => new Date(date || '').toLocaleDateString(locale);

export const getCurrentDate = dayjs().format(DATE_FORMATS.YYYY_MM_DD);
