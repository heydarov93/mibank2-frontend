import { render, screen } from '@testing-library/react';

import { UserBankCard } from './UserBankCard';

import { currencySymbol } from 'constants/currencies';
import { IUserBankCard } from 'models/IUserBankCard';

jest.mock('utils', () => ({
  separateThousands: (num: number) => num.toString(),
}));

describe('UserBankCard', () => {
  const mockCardData: IUserBankCard = {
    id: 1,
    name: 'Primary Card',
    number: 4532123456789012,
    balance: 3222,
    currency: 'USD',
    issuer: 'visa',
    expirationDate: '08/2027',
    type: 'plastic',
    status: 'active',
    holder: 'John Doe',
    cvv: 123,
    iban: 'US64SVBKUS6S3300958879',
    swift: 'SVBKUS6S',
    issueDate: '2022-05-15',
    cashbackRate: 1.5,
  };

  it('renders card data correctly', () => {
    render(<UserBankCard card={mockCardData} />);

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
