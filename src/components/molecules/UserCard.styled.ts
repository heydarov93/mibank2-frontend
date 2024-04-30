import { Avatar, Box, styled, Typography } from '@mui/material';

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
  color: palette.grey[400],
}));

export const StyledTypography = styled(Typography)(() => ({
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: 'Inter',
}));

export const StyledGreetingsName = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
}));

export const StyledTypographyBoldName = styled(Typography)(
  ({ theme: { palette } }) => ({
    fontSize: '14px',
    lineHeight: '20px',
    fontFamily: 'Inter',
    color: palette.common.black,
    fontWeight: 500,
  }),
);

export const StyledAvatar = styled(Avatar)(({ theme: { palette } }) => ({
  backgroundColor: palette.primary.main,
}));
