import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import { act } from 'react-dom/test-utils';

import { DepositCreationForm } from './DepositCreationForm';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <DepositCreationForm
        accounts={['Account 1', 'Account 2']}
        onBack={jest.fn()}
      />
    </ThemeProvider>,
  );

describe('DepositCreationForm', () => {
  it('renders correctly', () => {
    const { container } = renderPage();
    expect(container).toMatchSnapshot();
  });

  it('"Open deposit" button is disabled when the form is not valid', () => {
    const { getByRole } = renderPage();
    expect(getByRole('button', { name: 'openDeposit' })).toBeDisabled();
  });

  it('"Open deposit" button is enabled when the form is valid', async () => {
    const { getByRole, getByTestId } = renderPage();

    const accountSelect = getByTestId('account-select');
    const accountInput = accountSelect.querySelector(
      'input',
    ) as HTMLInputElement;
    const amountInput = getByRole('spinbutton') as HTMLInputElement;
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    const depositButton = getByRole('button', { name: 'openDeposit' });

    await act(async () => {
      accountSelect.focus();
      await wait();

      fireEvent.change(accountInput, { target: { value: 'a' } });
      await wait();

      fireEvent.keyDown(accountSelect, { key: 'ArrowDown' });
      await wait();

      fireEvent.keyDown(accountSelect, { key: 'Enter' });
      await wait();

      fireEvent.change(amountInput, { target: { value: '1000' } });
      fireEvent.click(checkbox);
    });

    expect(depositButton).toBeEnabled();
  });
});
