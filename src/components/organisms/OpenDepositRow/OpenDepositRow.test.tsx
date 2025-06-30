import { render, screen } from '@testing-library/react';

import { OpenDepositRow } from './OpenDepositRow';

import { TCurrency } from 'types/types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        chooseAmountStep: 'Choose Amount',
        selectAccountStep: 'Select Account',
        acceptTermsStep: 'Accept Terms',
        openDepositStep: 'Open Deposit',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('components/molecules/DepositSteps/DepositSteps', () => ({
  DepositSteps: ({
    steps,
  }: {
    steps: Array<{ id: number; title: string }>;
  }) => (
    <div data-testid="deposit-steps">
      {steps.map((step) => (
        <div key={step.id} data-testid={`step-${step.id}`}>
          {step.title}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('components/molecules', () => ({
  DepositCreationForm: ({
    depositName,
    onBack,
    depositId,
    interestRate,
    currency,
    term,
    modal,
  }: any) => (
    <div data-testid="deposit-creation-form">
      <div data-testid="form-deposit-name">{depositName}</div>
      <div data-testid="form-deposit-id">{depositId}</div>
      <div data-testid="form-interest-rate">{interestRate}</div>
      <div data-testid="form-currency">{currency}</div>
      <div data-testid="form-term">{term}</div>
      <div data-testid="form-modal">{modal.toString()}</div>
      <button onClick={onBack} data-testid="form-back-button">
        Back
      </button>
    </div>
  ),
}));

const defaultProps = {
  onBack: jest.fn(),
  depositId: 123,
  depositCurrency: 'USD' as TCurrency,
  interestRate: 5.5,
  term: 12,
  depositName: 'Premium Savings',
};

describe('OpenDepositRow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component structure', () => {
    it('renders main container with steps and form', () => {
      render(<OpenDepositRow {...defaultProps} />);

      expect(screen.getByTestId('deposit-container')).toBeInTheDocument();
      expect(screen.getByTestId('deposit-steps')).toBeInTheDocument();
      expect(screen.getByTestId('deposit-creation-form')).toBeInTheDocument();
    });
  });

  describe('Deposit steps display', () => {
    it('renders all four deposit steps with correct titles', () => {
      render(<OpenDepositRow {...defaultProps} />);

      expect(screen.getByTestId('step-1')).toHaveTextContent('Choose Amount');
      expect(screen.getByTestId('step-2')).toHaveTextContent('Select Account');
      expect(screen.getByTestId('step-3')).toHaveTextContent('Accept Terms');
      expect(screen.getByTestId('step-4')).toHaveTextContent('Open Deposit');
    });
  });

  describe('Form props passing', () => {
    it('passes all deposit information to creation form', () => {
      render(<OpenDepositRow {...defaultProps} />);

      expect(screen.getByTestId('form-deposit-name')).toHaveTextContent(
        'Premium Savings',
      );
      expect(screen.getByTestId('form-deposit-id')).toHaveTextContent('123');
      expect(screen.getByTestId('form-interest-rate')).toHaveTextContent('5.5');
      expect(screen.getByTestId('form-currency')).toHaveTextContent('USD');
      expect(screen.getByTestId('form-term')).toHaveTextContent('12');
      expect(screen.getByTestId('form-modal')).toHaveTextContent('false');
    });

    it('passes onBack callback to creation form', () => {
      const mockOnBack = jest.fn();
      render(<OpenDepositRow {...defaultProps} onBack={mockOnBack} />);

      const backButton = screen.getByTestId('form-back-button');
      expect(backButton).toBeInTheDocument();
    });
  });

  describe('Different deposit configurations', () => {
    it('handles different currency types', () => {
      render(
        <OpenDepositRow
          {...defaultProps}
          depositCurrency={'EUR' as TCurrency}
        />,
      );

      expect(screen.getByTestId('form-currency')).toHaveTextContent('EUR');
    });

    it('handles different interest rates', () => {
      render(<OpenDepositRow {...defaultProps} interestRate={7.25} />);

      expect(screen.getByTestId('form-interest-rate')).toHaveTextContent(
        '7.25',
      );
    });

    it('handles different terms', () => {
      render(<OpenDepositRow {...defaultProps} term={24} />);

      expect(screen.getByTestId('form-term')).toHaveTextContent('24');
    });

    it('handles different deposit names', () => {
      render(
        <OpenDepositRow {...defaultProps} depositName="High Yield Account" />,
      );

      expect(screen.getByTestId('form-deposit-name')).toHaveTextContent(
        'High Yield Account',
      );
    });

    it('handles different deposit IDs', () => {
      render(<OpenDepositRow {...defaultProps} depositId={456} />);

      expect(screen.getByTestId('form-deposit-id')).toHaveTextContent('456');
    });
  });

  describe('Translation integration', () => {
    it('uses translated step titles', () => {
      render(<OpenDepositRow {...defaultProps} />);

      expect(screen.getByTestId('step-1')).toHaveTextContent('Choose Amount');
      expect(screen.getByTestId('step-2')).toHaveTextContent('Select Account');
      expect(screen.getByTestId('step-3')).toHaveTextContent('Accept Terms');
      expect(screen.getByTestId('step-4')).toHaveTextContent('Open Deposit');
    });
  });
});
