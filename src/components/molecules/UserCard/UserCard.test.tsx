import { render, screen } from '@testing-library/react';

import { UserCard } from './UserCard';

import { EGreeting } from 'enums';
import { IUserInfo } from 'models/IUserInfo';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        if (key === 'greetings') return 'Hello';
        return key;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

describe('UserCard Component', () => {
  const user: IUserInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    isBlocked: null,
    status: 'verified',
  };

  it('should display user information when isShowUserInfo is true', () => {
    render(
      <UserCard
        user={user}
        isShowUserInfo={true}
        captureVariant={EGreeting.DEFAULT}
      />,
    );

    expect(screen.getByText('Hello,')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should display email when captureVariant is EMAIL', () => {
    render(<UserCard user={user} captureVariant={EGreeting.EMAIL} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should not display user information when isShowUserInfo is false', () => {
    render(<UserCard user={user} isShowUserInfo={false} />);

    expect(screen.queryByText('Hello,')).toBeNull();
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.queryByText('john.doe@example.com')).toBeNull();
  });

  it('should show empty name when isLoading is true', () => {
    render(<UserCard user={user} isLoading={true} />);

    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.queryByText('john.doe@example.com')).toBeNull();
  });

  it('should render initials correctly', () => {
    render(<UserCard user={user} />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should handle isViceversa correctly', () => {
    render(<UserCard user={user} isViceversa={true} />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
