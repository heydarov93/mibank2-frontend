import { styled, Box, Button } from '@mui/material';

export const StyledVerificationForm = styled('form')(
  ({ theme: { breakpoints } }) => ({
    width: 275,

    [breakpoints.up('sm')]: {
      width: 375,
    },

    [breakpoints.up('md')]: {
      width: 675,
    },
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

    [breakpoints.up('sm')]: {
      fontSize: 16,
    },
  }),
);
