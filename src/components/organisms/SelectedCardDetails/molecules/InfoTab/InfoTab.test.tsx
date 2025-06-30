import { render, screen, fireEvent } from '@testing-library/react';

import InfoTab, { TUserBankCardDetails } from './InfoTab';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('../InfoRow/InfoRow', () => {
  return function InfoRow({
    label,
    value,
    onToggle,
    onCopy,
    showIcon,
    masked,
    status,
    'data-testid': testId,
  }: any) {
    return (
      <div data-testid={testId}>
        <span data-testid={`${testId}-label`}>{label}</span>
        <span data-testid={`${testId}-value`}>
          {masked ? (
            <span data-testid={`${testId}-mask`}>{value}</span>
          ) : (
            <span data-testid={`${testId}-text`}>{value}</span>
          )}
        </span>
        {onToggle && (
          <button
            onClick={onToggle}
            data-testid={`${testId}-toggle`}
            data-show-icon={showIcon}
          >
            {showIcon ? 'Hide' : 'Show'}
          </button>
        )}
        {onCopy && (
          <button onClick={onCopy} data-testid={`${testId}-copy`}>
            Copy
          </button>
        )}
        {status && <span data-testid={`${testId}-status`}>{status}</span>}
      </div>
    );
  };
});

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const mockCardDetails: TUserBankCardDetails = {
  id: 'card-123',
  holder: 'John Doe',
  number: 1234567890123456,
  cvv: 123,
  iban: 'GB82WEST12345698765432',
  swift: 'WESTGB2L',
  issueDate: '2023.01.15',
  cashbackRate: 1.5,
  status: 'active',
  isPrimary: false,
};

describe('InfoTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    it('shows loading spinner when no card details provided', () => {
      render(<InfoTab selectedUserCardDetails={null as any} />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Card information display', () => {
    it('renders all card information fields', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(screen.getByTestId('info-row-card-status')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-card-holder')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-card-number')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-cvv')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-iban')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-swift-bic')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-issue-date')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-cashback-rate')).toBeInTheDocument();
    });

    it('displays card holder name', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(
        screen.getByTestId('info-row-card-holder-value'),
      ).toHaveTextContent('John Doe');
    });

    it('displays formatted cashback rate', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(
        screen.getByTestId('info-row-cashback-rate-value'),
      ).toHaveTextContent('1.5%');
    });

    it('displays capitalized status', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(
        screen.getByTestId('info-row-card-status-value'),
      ).toHaveTextContent('Active');
    });

    it('displays issue date', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(screen.getByTestId('info-row-issue-date-value')).toHaveTextContent(
        '2023.01.15',
      );
    });
  });

  describe('Sensitive data visibility', () => {
    it('masks card number by default', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(
        screen.getByTestId('info-row-card-number-value'),
      ).toHaveTextContent('**** 3456');
    });

    it('shows full card number when toggled', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      fireEvent.click(screen.getByTestId('info-row-card-number-toggle'));

      expect(
        screen.getByTestId('info-row-card-number-value'),
      ).toHaveTextContent('1234567890123456');
    });

    it('masks CVV by default', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      expect(screen.getByTestId('info-row-cvv-value')).toHaveTextContent('***');
    });

    it('shows CVV when toggled', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      fireEvent.click(screen.getByTestId('info-row-cvv-toggle'));

      expect(screen.getByTestId('info-row-cvv-value')).toHaveTextContent('123');
    });

    it('toggles card number visibility back to masked', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      fireEvent.click(screen.getByTestId('info-row-card-number-toggle'));
      expect(
        screen.getByTestId('info-row-card-number-value'),
      ).toHaveTextContent('1234567890123456');

      fireEvent.click(screen.getByTestId('info-row-card-number-toggle'));
      expect(
        screen.getByTestId('info-row-card-number-value'),
      ).toHaveTextContent('**** 3456');
    });
  });

  describe('Copy functionality', () => {
    it('copies IBAN to clipboard when copy button is clicked', () => {
      render(<InfoTab selectedUserCardDetails={mockCardDetails} />);

      fireEvent.click(screen.getByTestId('info-row-iban-copy'));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'GB82WEST12345698765432',
      );
    });
  });

  describe('Different card statuses', () => {
    it('displays blocked status correctly', () => {
      const blockedCard = { ...mockCardDetails, status: 'blocked' as const };
      render(<InfoTab selectedUserCardDetails={blockedCard} />);

      expect(
        screen.getByTestId('info-row-card-status-value'),
      ).toHaveTextContent('Blocked');
    });
  });
});
