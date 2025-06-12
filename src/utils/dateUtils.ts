export const getLocaleDateString = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL');

export const getLocaleTimeString = (dateString: string) =>
  new Date(dateString).toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  });
