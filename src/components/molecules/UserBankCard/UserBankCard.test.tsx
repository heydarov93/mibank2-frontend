import { render, screen } from '@testing-library/react';

import { UserBankCard, IUserBankCard } from './UserBankCard';

import { currencySymbol } from 'constants/currencies';

jest.mock('utils', () => ({
  separateThousands: (num: number) => num.toString(),
}));

describe('UserBankCard', () => {
  const mockCard: IUserBankCard = {
    holder: 'John Doe',
    name: 'Business Card',
    issuer: 'visa',
    number: 1234567890123456,
    cvv: 123,
    iban: 'PL00TESTIBAN',
    swift: 'TESTSWIFT',
    balance: 5000,
    currency: 'PLN',
    type: 'digital',
    issueDate: '2020-01-01',
    expirationDate: '2025-12-31',
    cashbackRate: 1.5,
    status: 'active',
  };

  it('renders card data correctly', () => {
    render(<UserBankCard data={mockCard} />);

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    expect(screen.getByTestId('simple-logo')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${currencySymbol[mockCard.currency]} ${mockCard.balance}`,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/3456/i)).toBeInTheDocument();
    expect(screen.getByText(mockCard.expirationDate)).toBeInTheDocument();
    expect(screen.getByText('virtual')).toBeInTheDocument();
    expect(screen.getByTestId('card-issuer-icon')).toHaveTextContent(/visa/i);
  });
});
