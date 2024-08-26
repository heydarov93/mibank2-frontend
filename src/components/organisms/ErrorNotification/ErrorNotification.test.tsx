import { fireEvent, render, screen } from '@testing-library/react';

import { ErrorNotification } from './ErrorNotification';

import { useAppDispatch, useAppSelector } from 'hooks';
import { clearError } from 'store/reducers/AuthSlice';

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('store/reducers/AuthSlice', () => ({
  clearError: jest.fn(),
}));

const dispatch = jest.fn();

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

  it('dispatches clearError action when alert is closed', () => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue('Error occurred.');

    render(<ErrorNotification />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(dispatch).toHaveBeenCalledWith(clearError());
  });
});
