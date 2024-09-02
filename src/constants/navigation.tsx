import {
  PaymentsOutlined,
  PersonOutlined,
  SettingsOutlined,
  HomeOutlined,
  SyncAlt,
  History,
} from '@mui/icons-material';
import { ReactNode } from 'react';

interface IMenuLinks {
  path: string;
  content: string;
  icon: ReactNode;
}

export const navMenuLinks: IMenuLinks[] = [
  {
    path: '/',
    content: 'home',
    icon: <HomeOutlined />,
  },
  {
    path: '/payments',
    content: 'payments',
    icon: <PaymentsOutlined />,
  },
  {
    path: '/transfers',
    content: 'transfers',
    icon: <SyncAlt />,
  },
  {
    path: '/history',
    content: 'history',
    icon: <History />,
  },
];

export const personalMenuLinks: IMenuLinks[] = [
  {
    path: '/',
    content: 'profile',
    icon: <PersonOutlined />,
  },
  {
    path: '/',
    content: 'settings',
    icon: <SettingsOutlined />,
  },
];
