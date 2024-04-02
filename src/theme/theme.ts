import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    common: {
      white: '#FFFFFF',
      black: '#060E20',
    },
    primary: {
      dark: '#1847C1',
      main: '#1C64EE',
      light: '#F0F7FF',
    },
    success: {
      main: '#1EB357',
      light: '#EDFCF2',
    },
    error: {
      main: '#B3261E',
      light: '#FCEEEE',
    },
    grey: {
      500: '#60636B',
      400: '#6E7A93',
      300: '#A8ADBA',
      200: '#E0E0E0',
      100: '#EDEDED',
    },
  },
});
