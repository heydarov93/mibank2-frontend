import { render, screen } from '@testing-library/react';

import { TUserBankCardComponent, UserBankCard } from './UserBankCard';

import { currencySymbol } from 'constants/currencies';

jest.mock('utils', () => ({
  separateThousands: (num: number) => num.toString(),
}));

describe('UserBankCard', () => {
  const mockCardData: TUserBankCardComponent = {
    name: 'Primary Card',
    number: 4532123456789012,
    balance: 3222,
    currency: 'USD',
    issuer: 'visa',
    expirationDate: '08/2027',
    issueType: 'plastic',
    holder: 'John Doe',
  };

  it('renders card data correctly', () => {
    render(<UserBankCard data={mockCardData} />);

    expect(screen.getByText(mockCardData.name)).toBeInTheDocument();
    expect(screen.getByTestId('simple-logo')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${currencySymbol[mockCardData.currency]} ${mockCardData.balance}`,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/3222/i)).toBeInTheDocument();
    expect(screen.getByText(mockCardData.expirationDate)).toBeInTheDocument();
    expect(screen.getByText('plastic')).toBeInTheDocument();
    expect(screen.getByTestId('card-issuer-icon')).toHaveTextContent(/visa/i);
  });
});
