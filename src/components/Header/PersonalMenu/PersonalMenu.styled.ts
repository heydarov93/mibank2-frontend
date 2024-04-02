import { Avatar, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPersonalMenu = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing(3),
}));

export const StyledGreetingsContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing(1),
  }),
);

export const StyledGreetings = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  color: palette.grey[300],
}));

export const StyledGreetingsName = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  color: palette.common.black,
}));

export const StyledAvatar = styled(Avatar)(({ theme: { palette } }) => ({
  backgroundColor: palette.primary.main,
}));

export const StyledButtonsContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  gap: spacing(2),
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: 0,
}));
