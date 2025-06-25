import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import { CardData } from '../../SelectedCardDetails';
import InfoTab from '../InfoTab';

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

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockCardData: CardData = {
  status: 'Active',
  cardHolder: 'John Doe',
  cardNumber: '•••• 1234',
  cvv: '•••',
  iban: 'US12 1116 6660 0000 0001 2345 678',
  swiftBic: 'TESTBIC',
  issueDate: '01.01.2026',
  cashbackRate: '1.5%',
};

describe('InfoTab Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render all InfoRow components with correct labels', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      expect(screen.getByTestId('info-row-status')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-card-holder')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-card-number')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-cvv')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-iban')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-swift-bic')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-issue-date')).toBeInTheDocument();
      expect(screen.getByTestId('info-row-cashback-rate')).toBeInTheDocument();
    });

    it('should render with correct container structure', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      expect(screen.getByTestId('card-info-section')).toBeInTheDocument();
    });

    it('should pass cardData values to InfoRow components', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      expect(screen.getByTestId('info-row-status')).toHaveAttribute(
        'data-value',
        'Active',
      );
      expect(screen.getByTestId('info-row-card-holder')).toHaveAttribute(
        'data-value',
        'John Doe',
      );
      expect(screen.getByTestId('info-row-iban')).toHaveAttribute(
        'data-value',
        mockCardData.iban,
      );
      expect(screen.getByTestId('info-row-swift-bic')).toHaveAttribute(
        'data-value',
        'TESTBIC',
      );
    });
  });

  describe('Card Number Visibility Toggle', () => {
    it('should initially show masked card number', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const cardNumberRow = screen.getByTestId('info-row-card-number');
      expect(cardNumberRow).toHaveAttribute('data-value', '•••• 1234');
      expect(cardNumberRow).toHaveAttribute('data-show-icon', 'false');
    });

    it('should toggle to show full card number when toggle button is clicked', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const toggleButton = screen
        .getByTestId('info-row-card-number')
        .querySelector('[data-testid="toggle-button"]');
      fireEvent.click(toggleButton!);

      const cardNumberRow = screen.getByTestId('info-row-card-number');
      expect(cardNumberRow).toHaveAttribute(
        'data-value',
        '1234 5678 9012 5846',
      );
      expect(cardNumberRow).toHaveAttribute('data-show-icon', 'true');
    });

    it('should toggle back to masked card number when clicked again', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const toggleButton = screen
        .getByTestId('info-row-card-number')
        .querySelector('[data-testid="toggle-button"]');

      fireEvent.click(toggleButton!);
      expect(screen.getByTestId('info-row-card-number')).toHaveAttribute(
        'data-value',
        '1234 5678 9012 5846',
      );

      fireEvent.click(toggleButton!);
      expect(screen.getByTestId('info-row-card-number')).toHaveAttribute(
        'data-value',
        '•••• 1234',
      );
    });

    it('should have masked prop set to true for card number row', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const cardNumberRow = screen.getByTestId('info-row-card-number');
      expect(cardNumberRow).toHaveAttribute('data-masked', 'true');
    });
  });

  describe('CVV Visibility Toggle', () => {
    it('should initially show masked CVV', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const cvvRow = screen.getByTestId('info-row-cvv');
      expect(cvvRow).toHaveAttribute('data-value', '•••');
      expect(cvvRow).toHaveAttribute('data-show-icon', 'false');
    });

    it('should toggle to show full CVV when toggle button is clicked', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const toggleButton = screen
        .getByTestId('info-row-cvv')
        .querySelector('[data-testid="toggle-button"]');
      fireEvent.click(toggleButton!);

      const cvvRow = screen.getByTestId('info-row-cvv');
      expect(cvvRow).toHaveAttribute('data-value', '123');
      expect(cvvRow).toHaveAttribute('data-show-icon', 'true');
    });

    it('should have masked prop set to true for CVV row', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const cvvRow = screen.getByTestId('info-row-cvv');
      expect(cvvRow).toHaveAttribute('data-masked', 'true');
    });
  });

  describe('Copy to Clipboard Functionality', () => {
    it('should call clipboard API when IBAN copy button is clicked', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const copyButton = screen
        .getByTestId('info-row-iban')
        .querySelector('[data-testid="copy-button"]');
      fireEvent.click(copyButton!);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        mockCardData.iban,
      );
    });

    it('should only provide copy functionality for IBAN row', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      expect(
        screen
          .getByTestId('info-row-iban')
          .querySelector('[data-testid="copy-button"]'),
      ).toBeInTheDocument();

      expect(
        screen
          .getByTestId('info-row-status')
          .querySelector('[data-testid="copy-button"]'),
      ).not.toBeInTheDocument();
      expect(
        screen
          .getByTestId('info-row-swift-bic')
          .querySelector('[data-testid="copy-button"]'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Status Field Special Handling', () => {
    it('should pass status prop to status InfoRow', () => {
      renderWithTheme(<InfoTab cardData={mockCardData} />);

      const statusRow = screen.getByTestId('info-row-status');
      expect(statusRow).toHaveAttribute('data-status', 'Active');
    });
  });
});
