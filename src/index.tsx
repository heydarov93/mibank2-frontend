import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './firebase';

import i18n from '../src/i18n';

import { routes } from './router';
import store, { persistor } from './store';
import { theme } from './theme/theme';

import './assets/css/global.css';
import { AutoLogoutMessageModal } from 'components/atoms/AutoLogoutModal/AutoLogoutMessageModal';
import { AutoLogoutModal } from 'components/atoms/AutoLogoutModal/AutoLogoutModal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
            <AutoLogoutModal />
            <AutoLogoutMessageModal />
            <CssBaseline />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);
