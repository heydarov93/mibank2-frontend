import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from './LoginPage';

const initialValues = {
  auth: {
    isAuth: false,
    user: null,
    error: null,
    loading: false,
  },
};

const mockStore = configureStore({
  reducer: () => initialValues,
});

jest.mock('utils', () => {
  return {
    generateRandomParam: jest.fn().mockReturnValue(''),
    handleNotFoundError: jest.fn(),
    handleLockedError: jest.fn(),
    useErrorHandlers: jest.fn,
    formatErrorMessage: jest.fn(),
    useFormatErrorMessage: jest.fn,
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
