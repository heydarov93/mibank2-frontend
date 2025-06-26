import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InfoTab from '../InfoTab';

import { IUserBankCard } from 'models/IUserBankCard';
import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        statusLabel: 'STATUS',
        holderLabel: 'CARD HOLDER',
        numberLabel: 'CARD NUMBER',
        cvvLabel: 'CVV',
        ibanLabel: 'IBAN',
        swiftLabel: 'SWIFT/BIC',
        dateLabel: 'ISSUE DATE',
        rateLabel: 'CASHBACK RATE',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('../InfoRow.tsx', () => {
  return function MockInfoRow({
    label,
    value,
    masked,
    onToggle,
    showIcon,
    onCopy,
    status,
  }: any) {
    return (
      <div
        data-testid={`info-row-${label.toLowerCase().replace(/[^a-z]/g, '-')}`}
        data-label={label}
        data-value={value}
        data-masked={masked}
        data-show-icon={showIcon}
        data-status={status}
      >
        <span data-testid="row-label">{label}</span>
        <span data-testid="row-value">{value}</span>
        {onToggle && (
          <button data-testid="toggle-button" onClick={onToggle}>
            Toggle
          </button>
        )}
        {onCopy && (
          <button data-testid="copy-button" onClick={onCopy}>
            Copy
          </button>
        )}
      </div>
    );
  };
});

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const renderInfoTab = (selectedCard: IUserBankCard) => {
  return render(
    <ThemeProvider theme={theme}>
      <InfoTab selectedCard={selectedCard} />
    </ThemeProvider>,
  );
};

describe('InfoTab', () => {
  const mockCard: IUserBankCard = {
    id: 1,
    name: 'Test Card',
    number: 1234567890123456,
    balance: 1000,
    currency: 'USD',
    issuer: 'visa',
    expirationDate: '12/25',
    type: 'plastic',
    status: 'active',
    holder: 'John Doe',
    cvv: 123,
    iban: 'US12345678901234567890',
    swift: 'TESTBANK',
    issueDate: '01.01.2023',
    cashbackRate: 1.5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render all card information fields', () => {
      renderInfoTab(mockCard);

      expect(screen.getByTestId('info-row-status')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-card-holder')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-card-number')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-cvv')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-iban')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-swift-bic')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-issue-date')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-cashback-rate')).toBeInTheDocument();
    });

    it('should display card data correctly', () => {
      renderInfoTab(mockCard);

      expect(screen.getByTestId('info-row-status')).toHaveAttribute(
        'data-value',
        'ACTIVE',
      );
      expect(screen.getByTestId('info-row-card-holder')).toHaveAttribute(
        'data-value',
        'John Doe',
      );
      expect(screen.getByTestId('info-row-iban')).toHaveAttribute(
        'data-value',
        'US12345678901234567890',
      );
      expect(screen.getByTestId('info-row-cashback-rate')).toHaveAttribute(
        'data-value',
        '1.5%',
      );
    });
  });

  describe('Card number visibility', () => {
    it('should initially show masked card number', () => {
      renderInfoTab(mockCard);

      const cardNumberRow = screen.getByTestId('info-row-card-number');
      expect(cardNumberRow).toHaveAttribute('data-value', '**** 3456');
      expect(cardNumberRow).toHaveAttribute('data-show-icon', 'false');
    });

    it('should show full card number when toggled', async () => {
      renderInfoTab(mockCard);

      const toggleButton = screen
        .getByTestId('info-row-card-number')
        .querySelector('[data-testid="toggle-button"]');
      await userEvent.click(toggleButton!);

      const cardNumberRow = screen.getByTestId('info-row-card-number');
      expect(cardNumberRow).toHaveAttribute('data-value', '1234567890123456');
      expect(cardNumberRow).toHaveAttribute('data-show-icon', 'true');
    });

    it('should toggle back to masked when clicked again', async () => {
      renderInfoTab(mockCard);

      const toggleButton = screen
        .getByTestId('info-row-card-number')
        .querySelector('[data-testid="toggle-button"]');

      await userEvent.click(toggleButton!);
      expect(screen.getByTestId('info-row-card-number')).toHaveAttribute(
        'data-value',
        '1234567890123456',
      );

      await userEvent.click(toggleButton!);
      expect(screen.getByTestId('info-row-card-number')).toHaveAttribute(
        'data-value',
        '**** 3456',
      );
    });
  });

  describe('CVV visibility', () => {
    it('should initially show masked CVV', () => {
      renderInfoTab(mockCard);

      const cvvRow = screen.getByTestId('info-row-cvv');
      expect(cvvRow).toHaveAttribute('data-value', '***');
      expect(cvvRow).toHaveAttribute('data-show-icon', 'false');
    });

    it('should show full CVV when toggled', async () => {
      renderInfoTab(mockCard);

      const toggleButton = screen
        .getByTestId('info-row-cvv')
        .querySelector('[data-testid="toggle-button"]');
      await userEvent.click(toggleButton!);

      const cvvRow = screen.getByTestId('info-row-cvv');
      expect(cvvRow).toHaveAttribute('data-value', '123');
      expect(cvvRow).toHaveAttribute('data-show-icon', 'true');
    });
  });

  describe('Copy functionality', () => {
    it('should copy IBAN to clipboard when copy button clicked', async () => {
      renderInfoTab(mockCard);

      const copyButton = screen
        .getByTestId('info-row-iban')
        .querySelector('[data-testid="copy-button"]');
      await userEvent.click(copyButton!);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'US12345678901234567890',
      );
    });
  });

  describe('Independent toggle states', () => {
    it('should manage card number and CVV visibility independently', async () => {
      renderInfoTab(mockCard);

      const cardNumberToggle = screen
        .getByTestId('info-row-card-number')
        .querySelector('[data-testid="toggle-button"]');
      const cvvToggle = screen
        .getByTestId('info-row-cvv')
        .querySelector('[data-testid="toggle-button"]');

      await userEvent.click(cardNumberToggle!);
      expect(screen.getByTestId('info-row-card-number')).toHaveAttribute(
        'data-show-icon',
        'true',
      );
      expect(screen.getByTestId('info-row-cvv')).toHaveAttribute(
        'data-show-icon',
        'false',
      );

      await userEvent.click(cvvToggle!);
      expect(screen.getByTestId('info-row-card-number')).toHaveAttribute(
        'data-show-icon',
        'true',
      );
      expect(screen.getByTestId('info-row-cvv')).toHaveAttribute(
        'data-show-icon',
        'true',
      );
    });
  });
});
