import { Avatar, Box, styled } from '@mui/material';

export const StyledGreetingsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isViceversa',
})<{ isViceversa: boolean }>(({ isViceversa, theme: { spacing } }) => ({
  display: 'inline-flex',
  flexDirection: isViceversa ? 'row-reverse' : 'row',
  alignItems: 'center',
  gap: spacing(1),
  padding: spacing(1),
}));

export const StyledGreetings = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isViceversa',
})<{ isViceversa: boolean }>(({ isViceversa, theme: { palette } }) => ({
  display: 'flex',
  justifyContent: isViceversa ? 'flex-start' : 'flex-end',
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
