import { Box, styled, Typography } from '@mui/material';

export const StyledBox = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: spacing(4),
  alignItems: 'center',
  gap: spacing(3),
  width: '100vw',
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
  }),
);

export const StyledTitle = styled(Typography)(
  ({ theme: { breakpoints, palette } }) => ({
    fontSize: '32px',
    color: palette.common.black,

    [breakpoints.up('sm')]: {
      fontSize: '28px',
    },

    [breakpoints.up('lg')]: {
      fontSize: '32px',
    },
  }),
);

export const StyledDescription = styled('div')(
  ({ theme: { breakpoints, palette, spacing } }) => ({
    position: 'relative',
    bottom: spacing(4),
    fontSize: '14px',
    textAlign: 'center',
    color: palette.grey[400],
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  }),
);
