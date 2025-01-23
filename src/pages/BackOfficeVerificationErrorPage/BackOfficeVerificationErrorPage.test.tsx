import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import BackOfficeVerificationErrorPage from './BackOfficeVerificationErrorPage';

jest.mock('components/atoms/ReloadButton/ReloadButton.tsx', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick: () => void }) => (
    <div data-testid="reload-icon" onClick={onClick}>
      Reload Button
    </div>
  ),
}));

describe('BackOfficeVerificationErrorPage', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <I18nextProvider i18n={i18n}>
        <BackOfficeVerificationErrorPage />
      </I18nextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the correct text content', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BackOfficeVerificationErrorPage />
      </I18nextProvider>,
    );

    expect(screen.getByTestId('title-text')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-text')).toBeInTheDocument();
  });

  it('reloads the page when the reload icon is clicked', () => {
    const originalLocation = window.location;

    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        reload: jest.fn(),
      },
      writable: true,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <BackOfficeVerificationErrorPage />
      </I18nextProvider>,
    );

    const reloadIcon = screen.getByTestId('reload-icon');
    fireEvent.click(reloadIcon);

    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });
});
