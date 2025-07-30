import { ThemeProvider } from "@mui/material/styles";
import { ReactNode, StrictMode } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { i18n } from "config";
import store, { persistor } from "store";
import { theme } from "theme/theme";

export const Providers = ({ children }: { children: ReactNode }) => (
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </StrictMode>
);

