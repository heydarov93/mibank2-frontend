import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

import { UnderDevLayout } from './UnderDevLayout';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('assets/icons/Under_development.svg', () => ({
  ReactComponent: () => <svg data-testid="under-dev-image" />,
}));

describe('UnderDevLayout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('renders image, title, description, and button', () => {
      render(<UnderDevLayout />);

      expect(screen.getByTestId('under-dev-image')).toBeInTheDocument();
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('description')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'buttonLabel' }),
      ).toBeInTheDocument();
    });
  });

  describe('navigation behavior', () => {
    it('calls navigate(-1) when button is clicked', async () => {
      render(<UnderDevLayout />);
      await userEvent.click(
        screen.getByRole('button', { name: 'buttonLabel' }),
      );
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
