import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { BackButton } from './BackButton';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('BackButton', () => {
  it('should call navigate once with -1 when button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<BackButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toBeCalledTimes(1);
  });
});
