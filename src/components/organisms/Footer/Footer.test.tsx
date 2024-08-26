import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { Footer } from './Footer';

import { useGetContactsQuery, useGetVersionQuery } from 'api/contactInfoApi';
import { useAppSelector } from 'hooks';

const initialValues = {
  auth: {
    user: null,
    error: null,
    loading: false,
  },
};

const mockStore = configureStore({
  reducer: () => initialValues,
});

const renderFooter = () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    </Provider>,
  );
};

jest.mock('api/contactInfoApi', () => ({
  useGetVersionQuery: jest.fn(),
  useGetContactsQuery: jest.fn(),
}));

jest.mock('hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}));

describe('Footer', () => {
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
  it('renders without crashing', () => {
    renderFooter();
  });

  it('renders FooterContacts and FooterTerms components', () => {
    renderFooter();

    expect(screen.getByText('footerBottom.terms')).toBeInTheDocument();
    expect(screen.getByText('footerBottom.policy')).toBeInTheDocument();
    expect(screen.getByText('footerBottom.copyright')).toBeInTheDocument();
  });
});
