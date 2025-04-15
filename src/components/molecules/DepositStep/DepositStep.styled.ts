import { Box, Stack, styled, Typography } from '@mui/material';

export const StepCircle = styled(Box)(({ theme: { palette } }) => ({
  width: '40px',
  height: '40px',
  border: `2px solid ${palette.primary.dark}`,
  borderRadius: '50%',
  color: palette.primary.dark,
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));

export const DashedLine = styled(Box)(({ theme: { palette } }) => ({
  width: '2px',
  height: '32px',
  background: `repeating-linear-gradient(
      to bottom,
      ${palette.primary.dark},
      ${palette.primary.dark} 4px,
      transparent 4px,
      transparent 8px
    )`,
  margin: '0 auto',
}));

export const StepStack = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
}));

export const StepRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '15px',
}));

export const StepText = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: 0,
}));
