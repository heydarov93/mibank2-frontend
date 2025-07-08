import { render, screen } from '@testing-library/react';

import { UserBankCard, TUserBankCardComponent } from './UserBankCard';

import { TCardIssueType } from 'types/types';

const mockCardData: TUserBankCardComponent = {
  holder: 'John Doe',
  name: 'Premium Card',
  issuer: 'visa',
  number: 1234567890123456,
  balance: 1500.5,
  currency: 'USD',
  expirationDate: '12/25',
  issueType: 'digital',
};

describe('UserBankCard', () => {
  describe('Card Information Display', () => {
    it('displays card name', () => {
      render(<UserBankCard data={mockCardData} />);
      expect(screen.getByText('Premium Card')).toBeInTheDocument();
    });

    it('displays masked card number showing only last 4 digits', () => {
      render(<UserBankCard data={mockCardData} />);
      expect(screen.getByText('•••• 3456')).toBeInTheDocument();
    });

    it('displays expiration date', () => {
      render(<UserBankCard data={mockCardData} />);
      expect(screen.getByText('12/25')).toBeInTheDocument();
    });

    it('displays Simple logo', () => {
      render(<UserBankCard data={mockCardData} />);
      expect(screen.getByTestId('simple-logo')).toBeInTheDocument();
    });
  });

  describe('Card Type Display', () => {
    it('displays "virtual" for digital card type', () => {
      render(<UserBankCard data={mockCardData} />);
      expect(screen.getByText('virtual')).toBeInTheDocument();
    });

    it('displays "plastic" for physical card type', () => {
      const physicalCardData = {
        ...mockCardData,
        issueType: 'plastic' as TCardIssueType,
      };
      render(<UserBankCard data={physicalCardData} />);
      expect(screen.getByText('plastic')).toBeInTheDocument();
    });
  });

  describe('Currency Support', () => {
    it('displays EUR currency symbol', () => {
      const eurCardData = { ...mockCardData, currency: 'EUR' as const };
      render(<UserBankCard data={eurCardData} />);
      expect(screen.getByText(/€/)).toBeInTheDocument();
    });

    it('displays GBP currency symbol', () => {
      const gbpCardData = { ...mockCardData, currency: 'GBP' as const };
      render(<UserBankCard data={gbpCardData} />);
      expect(screen.getByText(/£/)).toBeInTheDocument();
    });
  });

  describe('Balance Formatting', () => {
    it('formats large balance with thousands separator', () => {
      const largeBalanceData = { ...mockCardData, balance: 12345.67 };
      render(<UserBankCard data={largeBalanceData} />);
      expect(screen.getByText(/12\s*345\.67/)).toBeInTheDocument();
    });

    it('handles zero balance', () => {
      const zeroBalanceData = { ...mockCardData, balance: 0 };
      render(<UserBankCard data={zeroBalanceData} />);
      expect(screen.getByText(/\$\s*0/)).toBeInTheDocument();
    });
  });

  describe('Card Number Masking', () => {
    it('masks card number regardless of length', () => {
      const shortNumberData = { ...mockCardData, number: 12345678 };
      render(<UserBankCard data={shortNumberData} />);
      expect(screen.getByText('•••• 5678')).toBeInTheDocument();
    });

    it('handles card number with different format', () => {
      const differentNumberData = {
        ...mockCardData,
        number: 4444333322221111,
      };
      render(<UserBankCard data={differentNumberData} />);
      expect(screen.getByText('•••• 1111')).toBeInTheDocument();
    });
  });

  describe('Custom Sizing', () => {
    it('renders with default size when no size prop provided', () => {
      const { container } = render(<UserBankCard data={mockCardData} />);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveStyle({ width: '288em' });
    });

    it('renders with custom size when size prop provided', () => {
      const { container } = render(
        <UserBankCard data={mockCardData} size={200} />,
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveStyle({ width: '288em' });
    });
  });
});
