import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { TemporaryDrawer } from './Drawer';

import {
  MAIN_NAV_LINKS,
  PERSONAL_NAV_LINKS,
} from 'constants/navigation/navigation';
import { ETokenType } from 'enums';
import { useAppDispatch } from 'hooks';
import { getUser } from 'store/slices/auth';
import { logoutFromApp } from 'store/slices/auth/AuthSlice';
import { localTokenHandler, removeAuthData } from 'utils/auth';

jest.mock('hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('store/slices/auth/AuthSlice', () => ({
  ...jest.requireActual('store/slices/auth/AuthSlice'),
  logoutFromApp: jest.fn().mockReturnValue({ type: 'Auth/logoutFromApp' }),
}));

jest.mock('store/slices/auth/AuthSelectors', () => ({
  getUser: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/auth', () => ({
  localTokenHandler: {
    clearToken: jest.fn(),
    storeToken: jest.fn(),
    getToken: jest.fn(),
  },
  removeAuthData: jest.fn(),
}));

describe('TemporaryDrawer', () => {
  const mockDispatch = jest.fn();
  let renderResult: RenderResult;

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (getUser as jest.Mock).mockReturnValue(null);

    renderResult = render(
      <BrowserRouter>
        <TemporaryDrawer />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('snapshot should match', () => {
    const { asFragment } = renderResult;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the drawer component', () => {
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });

  it('should render the navigation items', () => {
    const openButton = screen.getByRole('button', { name: /open drawer/i });
    fireEvent.click(openButton);

    MAIN_NAV_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });

    PERSONAL_NAV_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it('should call logoutHandler and navigate to /signin on logout', () => {
    const openButton = screen.getByRole('button', { name: /open drawer/i });
    fireEvent.click(openButton);

    const logoutButton = screen.getByText('logOut');
    fireEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalledWith(logoutFromApp());
    expect(localTokenHandler.clearToken).toHaveBeenCalledWith(
      ETokenType.ACCESS,
    );
    expect(removeAuthData).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });
});
