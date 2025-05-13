import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';

import { SavePaymentWrapper } from './SavePaymentWrapper';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const renderInput = () =>
  render(
    <ThemeProvider theme={theme}>
      <SavePaymentWrapper />
    </ThemeProvider>,
  );

describe('<SavePaymentWrapper />', () => {
  beforeEach(() => {
    renderInput();
  });

  it('snapshot should match', () => {
    const { asFragment } = renderInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the save checkbox and not display input field initially', () => {
    expect(screen.getByLabelText('transferModal.saveToPaymentLabel')).toBeInTheDocument();

    expect(screen.queryByPlaceholderText('transferModal.paymentInputPlaceholder')).not.toBeInTheDocument();
  });

  it('should display input field when checkbox is checked', () => {
    const checkbox = screen.getByLabelText('transferModal.saveToPaymentLabel');
    fireEvent.click(checkbox);

    expect(screen.getByPlaceholderText('transferModal.paymentInputPlaceholder')).toBeInTheDocument();
  });

  it('should show validation error when input is invalid', async () => {
    const checkbox = screen.getByLabelText('transferModal.saveToPaymentLabel');
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText('transferModal.paymentInputPlaceholder');

    fireEvent.blur(input);

    expect(await screen.findByText('transferModal.paymentNameLabel')).toBeInTheDocument();
  });
});
