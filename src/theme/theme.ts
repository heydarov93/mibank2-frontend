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
    disabled: {
      blue: '#6b9af4',
    },
  },
  animations: {
    shake: shakeAnimation,
  },
});

theme.components = {
  MuiButton: {
    defaultProps: {
      sx: {
        borderRadius: '8px',
      },
    },
    variants: [
      {
        props: { boxShadow: true },
        style: {
          boxShadow:
            '0 2px 4px -1px rgba(28, 100, 238, 0.2), 0 1px 10px 0 rgba(28, 100, 238, 0.12);',
        },
      },
      {
        props: { disabled: true, variant: 'contained' },
        style: {
          '&&': {
            background: `${theme.palette.primary.main}A6`, // opacity 0.65
            color: theme.palette.common.white,
          },
        },
      },
      {
        props: { disabled: true, variant: 'outlined' },
        style: {
          '&&': {
            color: theme.palette.disabled.blue,
            borderColor: theme.palette.disabled.blue,
          },
        },
      },
      {
        props: { disabled: true, variant: 'text' },
        style: {
          '&&': {
            color: theme.palette.grey[300],
          },
        },
      },
    ],
    styleOverrides: {
      containedPrimary: {
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
    },
  },
};
