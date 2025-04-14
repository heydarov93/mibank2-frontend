import { createTheme, keyframes } from '@mui/material';

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    smallLogo: {
      fontSize: '12px',
      lineHeight: '15px',
      fontFamily: 'Inter',
    },
    mediumLogo: {
      fontSize: '14px',
      lineHeight: '20px',
      fontFamily: 'Roboto',
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
      dark: '#007C52',
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
    border: {
      lightBlue: '#DDE6F7',
    },
    bg: {
      lightBlue: '#F4F9FF',
    },
    shadow: {
      shadowLight: 'rgba(109, 114, 120, 0.1)',
      shadowCoolLight: 'rgba(211, 217, 233, 0.12)',
      shadowMedium: 'rgba(0, 0, 0, 0.3)',
    },
  },
  animations: {
    shake: shakeAnimation,
  },
});
