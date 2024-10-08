import { fireEvent, render, screen } from '@testing-library/react';

import { ErrorNotification } from './ErrorNotification';

import { useAppDispatch, useAppSelector } from 'hooks';
import { clearError } from 'store/reducers/AuthSlice';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
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

  it('should dispatch clearError when the error notification is closed', () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue('An error occurred');

    render(<ErrorNotification />);

    const snackbar = screen.getByRole('alert');
    expect(snackbar).toBeInTheDocument();

    fireEvent.keyDown(snackbar, { key: 'Escape' });

    expect(dispatch).toHaveBeenCalledWith(clearError());
  });
});
