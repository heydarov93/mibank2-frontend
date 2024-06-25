import { styled, Box, Typography, Button } from '@mui/material';

export const StyledVerificationForm = styled('form')(
  ({ theme: { breakpoints } }) => ({
    width: 345,

    [breakpoints.up('sm')]: {
      width: 680,
    },

    [breakpoints.up('md')]: {
      width: 575,
    },
  }),
);

export const StyledVerificationTitle = styled(Typography)(
  ({ theme: { breakpoints } }) => ({
    fontSize: 24,
    fontWeight: 500,

    [breakpoints.up('md')]: {
      fontSize: 40,
    },
  }),
);

export const StyledVerificationSubTitle = styled(Typography)(
  ({ theme: { breakpoints } }) => ({
    fontSize: 14,
    lineHeight: '20px',
    fontFamily: 'Roboto',
    textAlign: 'center',

    [breakpoints.up('md')]: {
      fontSize: 20,
    },
  }),
);

export const StyledVerificationBoxTitle = styled(Box)(
  ({ theme: { spacing } }) => ({
    marginTop: spacing(6),
    marginBottom: spacing(3),

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
);

export const StyledVerificationFormContent = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(1),
  }),
);

export const StyledButton = styled(Button)(
  ({ theme: { palette, breakpoints } }) => ({
    fontSize: 12,
    fontWeight: 500,
    color: palette.primary.dark,
    textTransform: 'none',
    background: 'none',
    border: 'none',
    padding: 0,
    marginTop: 16,

    '&:hover': {
      background: 'none',
    },

    '&:disabled': {
      opacity: '0.65',
      color: palette.primary.dark,
    },

    [breakpoints.up('md')]: {
      fontSize: 16,
    },
  }),
);
