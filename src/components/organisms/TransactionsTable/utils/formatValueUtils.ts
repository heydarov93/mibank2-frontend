import dayjs from 'dayjs';

export const formatDateTime = (datetime: string) => {
  const date = dayjs(datetime);
  const dateStr = date.format('DD/MM/YYYY');
  const timeStr = date.format('HH:mm');
  return { date: dateStr, time: timeStr };
};

export const formatCardNumber = (cardName: string, cardNumber: string) => {
  const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
  return `${cardName} **** ${lastFour}`;
};

export const formatIbanNumber = (iban: string) => {
  const firstFour = iban.slice(0, 4);
  const lastFour = iban.slice(-4);
  return `${firstFour} **** ${lastFour}`;
};
