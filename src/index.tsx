import { CssBaseline } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Providers } from 'app/Providers';
import {
  SessionExpiredModal,
  SessionTimeoutWarningModal,
} from 'components/organisms';
import { routes } from 'router';
import './assets/css/global.css';
import './config/firebase/firebase.config';

dayjs.extend(isBetween);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Providers>
    <RouterProvider router={routes} />
    <SessionTimeoutWarningModal />
    <SessionExpiredModal />
    <CssBaseline />
  </Providers>,
);
