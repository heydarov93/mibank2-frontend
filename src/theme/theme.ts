import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
      500: '#27282B',
      400: '#60636B',
      300: '#A8ADBA',
      200: '#D3D9E9',
      100: '#E0E0E0',
      50: '#EDEDED',
    },
  },
});
