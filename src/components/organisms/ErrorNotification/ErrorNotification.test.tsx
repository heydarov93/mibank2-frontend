import { render, screen } from '@testing-library/react';

import { ErrorNotification } from './ErrorNotification';

import { useAppSelector } from 'hooks';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('store/reducers/AuthSlice', () => ({
  clearError: jest.fn(),
}));

describe('ErrorNotification', () => {
  it('renders without crashing', () => {
    render(<ErrorNotification />);
  });

  it('displays correct error message', () => {
    (useAppSelector as jest.Mock).mockReturnValue(
      'Please, read and agree to our Terms of Use and Privacy Policy to continue',
    );

    render(<ErrorNotification />);

    const errorMessage = screen.getByText(
      /Please, read and agree to our Terms of Use and Privacy Policy to continue/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
