import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';


import { SignupFormEmail } from '../SignupFormEmail';

import store from 'store';


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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignupFormEmail', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupFormEmail />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupFormEmail />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should enable the submit button only when the form is valid', async () => {

    const emailInput = screen.getByLabelText('Email');
    const continueButton = screen.getByText('Continue');

    expect(continueButton).toBeDisabled();

    fireEvent.change(emailInput, {
      target: { value: 'validemail@example.com' },
    });

    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(continueButton).not.toBeDisabled();
    });
  });
});
