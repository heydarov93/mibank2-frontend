export const formatIbanNumber = (iban: string) => {
  const firstFour = iban.slice(0, 4);
  const lastFour = iban.slice(-4);
  return `${firstFour} **** ${lastFour}`;
};
