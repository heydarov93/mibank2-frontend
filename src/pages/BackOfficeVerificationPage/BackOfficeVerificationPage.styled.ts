import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '95vh',
  flexDirection: 'column',
  gap: spacing(3),
}));

export const StepContainer = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '16px',
    backgroundColor: palette.primary.light,
    fontFamily: typography.smallLogo?.fontFamily,
    padding: '4px 16px',
    color: palette.grey[400],
    border: '1px solid #DDE6F7',
    borderRadius: '8px',
  }),
);

export const Header = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: '32px',
  fontWeight: '500',
  fontFamily: typography.mediumLogo?.fontFamily,
}));

export const StepDescription = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: 400,
  }),
);

export const StepBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
