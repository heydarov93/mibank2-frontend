import { styled, Typography, Box, Link } from '@mui/material';

export const StyledForm = styled('form')(({ theme: { breakpoints } }) => ({
  width: 345,

  [breakpoints.up('sm')]: {
    width: 680,
  },

  [breakpoints.up('md')]: {
    width: 575,
  },
}));

export const StyledFormContent = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing(2),
}));

export const StyledLable = styled('label')(({ theme: { palette } }) => ({
  color: palette.common.black,
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
}));

export const StyledFormTitle = styled(Typography)(
  ({ theme: { spacing, breakpoints } }) => ({
    marginTop: spacing(6),
    marginBottom: spacing(3),
    fontSize: 20,
    fontWeight: 500,

    [breakpoints.up('sm')]: {
      marginTop: spacing(5),
      marginBottom: spacing(2),
      fontSize: 32,
      fontWeight: 400,
    },

    [breakpoints.up('md')]: {
      marginTop: '18px',
    },
  }),
);

export const StyledButtonContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingTop: spacing(3),

    [breakpoints.up('sm')]: {
      paddingTop: spacing(2),
    },
  }),
);

export const StyledSignInLinkContainer = styled(Box)(
  ({ theme: { breakpoints, palette } }) => ({
    display: 'flex',
    paddingTop: 39,
    fontSize: 16,
    fontWeight: 400,
    color: palette.common.black,

    [breakpoints.up('sm')]: {
      paddingTop: 31,
    },
  }),
);

export const StyledSignInLink = styled(Link)(({ theme }) => ({
  paddingLeft: 8,
  fontWeight: 500,
  textDecoration: 'underline',
  color: theme.palette.primary.main,
}));
