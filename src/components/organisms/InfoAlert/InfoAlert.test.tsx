import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import { InfoAlert } from './InfoAlert';

import { theme } from 'theme/theme';

const defaults = {
  successTitle: 'Success',
  successMessage: 'Operation completed successfully!',
  errorTitle: 'Something went wrong',
  errorMessage: 'Unknown error occured',
};

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('InfoAlert', () => {
  const mockTranslation = (key: string) => {
    switch (key) {
      case 'common.success.title':
        return defaults.successTitle;
      case 'common.success.message':
        return defaults.successMessage;
      case 'common.error.title':
        return defaults.errorTitle;
      case 'common.error.message':
        return defaults.errorMessage;
      default:
        return '';
    }
  };

  beforeEach(() => {
    (useTranslation as jest.Mock).mockImplementation(() => ({
      t: mockTranslation,
    }));
  });

  test.each([
    ['success', defaults.successTitle, defaults.successMessage, 'success-icon'],
    ['error', defaults.errorTitle, defaults.errorMessage, 'error-icon'],
  ])(
    'should render the correct alert for %s type',
    (type, expectedTitle, expectedMessage, iconTestId) => {
      const { asFragment } = render(
        <ThemeProvider theme={theme}>
          <InfoAlert
            open={true}
            onClose={jest.fn()}
            type={type as 'success' | 'error' | undefined}
            title={expectedTitle}
            message={expectedMessage}
          />
        </ThemeProvider>,
      );

      expect(screen.getByText(expectedTitle)).toBeInTheDocument();
      expect(screen.getByText(expectedMessage)).toBeInTheDocument();

      expect(screen.getByTestId(iconTestId)).toBeInTheDocument();

      expect(asFragment()).toMatchSnapshot();
    },
  );

  it('should call onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <InfoAlert open={true} onClose={onCloseMock} type="success" />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not render the alert when open is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <InfoAlert open={false} onClose={jest.fn()} type="error" />
      </ThemeProvider>,
    );

    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });
});
