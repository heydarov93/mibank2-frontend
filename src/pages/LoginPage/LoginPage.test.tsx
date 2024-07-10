import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
