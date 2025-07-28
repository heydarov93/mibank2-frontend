import { render, RenderResult, screen } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { UserAuthWrapper } from './UserAuthWrapper';

import { Logo } from 'components/atoms';

i18n.init({
  resources: {
    en: {
      translation: {
        'Test Child': 'Test Child',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

jest.mock('components/molecules/ErrorNotification/ErrorNotification', () => ({
  ErrorNotification: jest.fn(() => <div>Error Notification</div>),
}));

jest.mock('components/atoms', () => ({
  Logo: jest.fn(() => <div>Logo</div>),
}));

describe('AuthWrapper', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <I18nextProvider i18n={i18n}>
        <UserAuthWrapper>
          <div>Test Child</div>
        </UserAuthWrapper>
      </I18nextProvider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('snapshot should match', () => {
    const { asFragment } = renderResult;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the Logo component with the correct size', () => {
    expect(Logo).toHaveBeenCalledWith({ size: 'lg' }, expect.anything());
  });

  it('should render children components', () => {
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
