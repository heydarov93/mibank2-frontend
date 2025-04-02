export const calculateInterest = (
  investmentAmount: number,
  interestRate: number,
) => {
  return investmentAmount * (interestRate / 100);
};

export const calculateProfit = (
  investmentAmount: number,
  interestRate: number,
) => {
  return investmentAmount * (1 + interestRate / 100);
};
