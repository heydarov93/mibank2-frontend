import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { FooterContacts } from './FooterContacts';

import { useGetVersionQuery, useGetContactsQuery } from 'api/contactInfoApi';
import { useAppSelector } from 'hooks';
import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
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

jest.mock('api/contactInfoApi', () => ({
  useGetVersionQuery: jest.fn(),
  useGetContactsQuery: jest.fn(),
}));

jest.mock('hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}));

const renderFooterContacts = () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <FooterContacts />
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe('FooterContacts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetVersionQuery as jest.Mock).mockReturnValue({ data: { id: '1' } });
    (useGetContactsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        contactCenterWorkingDays: 'Mon-Fri',
        contactCenterWorkingDayBeginTime: '08:00',
        contactCenterWorkingDayEndTime: '18:00',
        contactCenterShortenedDays: 'Sat',
        contactCenterShortenedDayBeginTime: '09:00',
        contactCenterShortenedDayEndTime: '13:00',
      },
    });
    (useAppSelector as jest.Mock).mockReturnValue({
      id: '1',
      email: 'test@example.com',
      phoneNumber: '(+48) 123 456 789',
      contactCenterWorkingDays: 'Mon-Fri',
      contactCenterWorkingDayBeginTime: '08:00',
      contactCenterWorkingDayEndTime: '18:00',
      contactCenterShortenedDays: 'Sat',
      contactCenterShortenedDayBeginTime: '09:00',
      contactCenterShortenedDayEndTime: '13:00',
    });
  });

  it('renders logo component', () => {
    renderFooterContacts();
    expect(screen.getByTestId(/logo/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderFooterContacts();
    expect(screen.getByText('(+48) 123 456 789')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders working hours', () => {
    renderFooterContacts();
    expect(screen.getByText('Mon-Fri 08:00 - 18:00')).toBeInTheDocument();
    expect(screen.getByText('Sat: 09:00 - 13:00')).toBeInTheDocument();
  });
});
