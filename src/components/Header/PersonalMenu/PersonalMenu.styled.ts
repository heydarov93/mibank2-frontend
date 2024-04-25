import { Box, IconButton, styled } from '@mui/material';

export const StyledPersonalMenu = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing(3),
}));

export const StyledButtonsContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    display: 'none',
    gap: spacing(2),

    [breakpoints.up('lg')]: {
      display: 'flex',
    },
  }),
);

export const StyledIconButton = styled(IconButton)(() => ({
  padding: 0,
}));
