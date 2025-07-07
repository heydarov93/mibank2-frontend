export const formatCardNumber = (cardName: string, cardNumber: string) => {
  const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
  return `${cardName} **** ${lastFour}`;
};
