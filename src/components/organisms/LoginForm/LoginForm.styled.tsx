import { styled, TextField, Typography, Box, Link } from '@mui/material';

export const StyledBoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 768,
}));

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

export const StyledTextField = styled(TextField)(
  ({ theme: { palette, animations } }) => ({
    '&.shake': {
      animation: `${animations?.shake} 0.25s`,
    },

    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: 8,
        border: `1px solid ${palette.grey[300]}`,
      },

      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'secondary.main',
        },
      },

      '&:hover:not(.Mui-focused)': {
        '& .MuiOutlinedInput-notchedOutline': {
          border: `2px solid ${palette.grey[400]}`,
        },
      },
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

export const StyledSignUpLinkContainer = styled(Box)(
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

export const StyledSignUpLink = styled(Link)(({ theme }) => ({
  paddingLeft: 8,
  fontWeight: 500,
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));
