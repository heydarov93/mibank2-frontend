import { render, RenderResult, screen } from '@testing-library/react';

import { AuthWrapper } from './AuthWrapper';

import { ELogoSize, Logo } from 'components/atoms';

jest.mock('../ErrorNotification/ErrorNotification', () => ({
  ErrorNotification: jest.fn(() => <div>Error Notification</div>),
}));

jest.mock('components/atoms', () => ({
  ELogoSize: { MEDIUM: 'medium' },
  Logo: jest.fn(() => <div>Logo</div>),
}));

describe('AuthWrapper', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <AuthWrapper>
        <div>Test Child</div>
      </AuthWrapper>,
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
    expect(Logo).toHaveBeenCalledWith(
      { size: ELogoSize.MEDIUM },
      expect.anything(),
    );
  });

  it('should render children components', () => {
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
