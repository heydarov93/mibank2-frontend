import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';


import { SignupFormPassword } from '../SignupFormPassword';

import store from 'store';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('utils', () => {
  return {
    generateRandomParam: jest.fn().mockReturnValue(''),
    handleNotFoundError: jest.fn(),
    handleLockedError: jest.fn(),
    useErrorHandlers: jest.fn,
    formatErrorMessage: jest.fn(),
    useFormatErrorMessage: jest.fn,
    localTokenHandler: {
      getToken: jest.fn(),
    },
  };
});

describe('SignupFormPassword', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupFormPassword />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupFormPassword />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should enable the submit button only when the form is valid', async () => {
    const passwordInput = screen.getByLabelText('mainLabel');
    const confirmPasswordInput = screen.getByLabelText('confirmLabel');
    const submitButton = screen.getByText('buttonLabelSignup');

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'validPassword!123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'validPassword!123' },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
