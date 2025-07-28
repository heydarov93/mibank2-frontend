import {
  PaymentsOutlined,
  PersonOutlined,
  SettingsOutlined,
  HomeOutlined,
  SyncAlt,
  History,
} from '@mui/icons-material';
import { ReactNode } from 'react';

import {
  TO_CARDS,
  TO_CURRENCY,
  TO_DEPOSITS,
  TO_HISTORY,
  TO_HOME,
  TO_LOANS,
  TO_PAYMENTS,
  TO_SERVICES,
  TO_TRANSFERS,
} from './routePaths';

interface INavLinkBase {
  path: string;
  label: string;
}

interface INavLinkWithIcon extends INavLinkBase {
  icon: ReactNode;
}

export const MAIN_NAV_LINKS: readonly INavLinkWithIcon[] = [
  {
    path: TO_HOME,
    label: 'home',
    icon: <HomeOutlined />,
  },
  {
    path: TO_PAYMENTS,
    label: 'payments',
    icon: <PaymentsOutlined />,
  },
  {
    path: TO_TRANSFERS,
    label: 'transfers',
    icon: <SyncAlt />,
  },
  {
    path: TO_HISTORY,
    label: 'history',
    icon: <History />,
  },
];

export const WELCOME_NAV_LINKS: readonly INavLinkBase[] = [
  {
    path: TO_CARDS,
    label: 'cards',
  },
  {
    path: TO_DEPOSITS,
    label: 'deposits',
  },
  {
    path: TO_LOANS,
    label: 'loans',
  },
  {
    path: TO_SERVICES,
    label: 'services',
  },
  {
    path: TO_CURRENCY,
    label: 'currency',
  },
];

export const PERSONAL_NAV_LINKS: readonly INavLinkWithIcon[] = [
  {
    path: TO_HOME,
    label: 'profile',
    icon: <PersonOutlined />,
  },
  {
    path: TO_HOME,
    label: 'settings',
    icon: <SettingsOutlined />,
  },
];
