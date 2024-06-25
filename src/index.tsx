import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import i18n from '../src/i18n';

import reportWebVitals from './reportWebVitals';
import { routes } from './router';
import { store } from './store/store';
import { theme } from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={routes} />
          <CssBaseline />
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);
