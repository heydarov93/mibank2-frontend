export const formatCardNumber = (source: string) => {
  const [cardName, cardNumber] = source.split('_');
  const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
  return `${cardName} **** ${lastFour}`;
};
