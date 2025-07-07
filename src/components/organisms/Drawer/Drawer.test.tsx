import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { TemporaryDrawer } from './Drawer';

import { navMenuLinks, personalMenuLinks } from 'constants/navigation';
import { ETokenType } from 'enums';
import { useAppDispatch } from 'hooks';
import { logoutFromApp } from 'store/reducers/AuthSlice';
import { getUser } from 'store/selectors';
import { localTokenHandler, removeAuthData } from 'utils/auth';

jest.mock('hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock('store/selectors', () => ({
  getUser: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('store/reducers/AuthSlice', () => ({
  ...jest.requireActual('store/reducers/AuthSlice'),
  logoutFromApp: jest.fn().mockReturnValue({ type: 'Auth/logoutFromApp' }),
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
      <Router>
        <TemporaryDrawer />
      </Router>,
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

    navMenuLinks.forEach((link) => {
      expect(screen.getByText(link.content)).toBeInTheDocument();
    });

    personalMenuLinks.forEach((link) => {
      expect(screen.getByText(link.content)).toBeInTheDocument();
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
