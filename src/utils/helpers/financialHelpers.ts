export const calculateInterest = (
  investmentAmount: number,
  interestRate: number,
): number => investmentAmount * (interestRate / 100);

export const calculateProfit = (
  investmentAmount: number,
  interestRate: number,
): number => investmentAmount * (1 + interestRate / 100);

export const calculateInterestAmount = (
  interestAmount: number,
  interestRate: number,
) =>
  interestAmount && interestRate
    ? ((interestAmount * interestRate) / 100).toFixed(2)
    : null;
