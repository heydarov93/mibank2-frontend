import { createTheme, keyframes } from '@mui/material';

import { ExpandMoreIcon } from 'components/atoms';

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
      600: '#383733',
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
    userCardStack: {
      card1: '#8493BB',
      card2: '#CFD5E2',
    },
  },
  animations: {
    shake: shakeAnimation,
  },
});

theme.components = {
  MuiButton: {
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
            background: `${theme.palette.primary.main}A6`,
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
      root: {
        borderRadius: '8px',
        fontSize: 16,
      },
      containedPrimary: {
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: ExpandMoreIcon,
    },
    styleOverrides: {
      root: {
        borderRadius: '8px',
        fontSize: '14px',

        '&, &:hover:not(.Mui-disabled)': {
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[400],
          },
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px',
        },

        '& .MuiList-root': {
          borderRadius: '8px',
        },
      },
      icon: {
        right: '10px',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '8px',
        boxShadow: `0 4px 24px 0 ${theme.palette.shadow.shadowLight};`,
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.grey[200]}`,
        marginTop: '4px',

        '.MuiMenuItem-root': {
          fontSize: '14px',
          height: '40px',
        },

        '.MuiList-root': {
          padding: 0,
        },

        '.Mui-selected': {
          color: theme.palette.primary.main,
          background: theme.palette.primary.light,
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 0,
        width: '36px',
        height: '20px',
      },
      switchBase: {
        padding: 0,

        '&.Mui-checked': {
          transform: 'translateX(16px)',

          '.MuiSwitch-thumb': {
            background: theme.palette.common.white,
          },
          '+ .MuiSwitch-track': {
            opacity: 1,
          },
        },
      },
      thumb: {
        width: '18px',
        height: '18px',
        boxShadow: 'none',
        marginTop: '1px',
        marginLeft: '1px',
        background: theme.palette.grey[300],
      },
      track: {
        borderRadius: '10px',
        background: theme.palette.grey[400],
        opacity: 1,
      },
    },
    variants: [
      {
        props: { disabled: true },
        style: {
          cursor: 'not-allowed',
          '&& span.MuiSwitch-thumb': {
            background: theme.palette.grey[300],
          },
          '&& span.MuiSwitch-track': {
            background: theme.palette.grey[400],
            opacity: 1,
          },
        },
      },
    ],
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        margin: 0,
        marginTop: theme.spacing(0.5),
      },
    },
  },
};
