import { styled, Box, Typography } from '@mui/material';

export const StyledVerificationTitle = styled(Typography)(
  ({ theme: { breakpoints } }) => ({
    fontSize: 24,
    fontWeight: 500,

    [breakpoints.up('sm')]: {
      fontSize: 40,
    },
  }),
);

export const StyledVerificationSubTitle = styled(Typography)(
  ({ theme: { breakpoints } }) => ({
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'center',

    [breakpoints.up('sm')]: {
      fontSize: 20,
      lineHeight: '30px',
      maxWidth: '588px',
    },

    '&>span': {
      whiteSpace: 'nowrap',
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
