import { Box, styled, Typography } from '@mui/material';

export const UnderDevPageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
  minHeight: 500,
}));

export const StyledBox = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing(3),
  svg: {
    width: '62vw',
    height: 'auto',
  },

  [breakpoints.up('md')]: {
    svg: {
      width: '42vw',
      height: 'auto',
    },
  },

  [breakpoints.up('xl')]: {
    gap: spacing(4),
    svg: {
      width: '40vw',
      height: 'auto',
    },
  },
}));

export const StyledTitleContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing(1.5),

    [breakpoints.up('xs')]: {
      maxWidth: '80%',
    },

    [breakpoints.up('md')]: {
      maxWidth: '60%',
    },

    [breakpoints.up('xl')]: {},
  }),
);

export const StyledTitle = styled(Typography)(({ theme: { breakpoints } }) => ({
  fontSize: '22px',

  [breakpoints.up('md')]: {
    fontSize: '28px',
  },

  [breakpoints.up('xl')]: {
    fontSize: '36px',
  },
}));

export const StyledDescription = styled(Typography)(
  ({ theme: { breakpoints, palette } }) => ({
    color: palette.grey[400],

    [breakpoints.up('md')]: {
      fontSize: '16px',
    },

    [breakpoints.up('xl')]: {},
  }),
);
