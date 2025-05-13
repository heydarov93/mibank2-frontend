import { styled, Typography, Box } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { animations } }) => ({
  display: 'flex',
  alignItems: 'center',

  '&.shake': {
    animation: `${animations?.shake} 0.25s`,
  },
}));

export const AgreementContainer = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'hasError',
})<{ disabled: boolean; hasError: boolean }>(
  ({ theme, disabled, hasError }) => ({
    paddingTop: theme.spacing(2),
    lineHeight: '16px',
    letterSpacing: 0.5,
    fontWeight: 400,

    color: hasError
      ? theme.palette.error.main
      : disabled
        ? theme.palette.grey[300]
        : theme.palette.common.black,

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(0),
    },
  }),
);
