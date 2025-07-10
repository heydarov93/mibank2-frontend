import { Box, styled, Typography } from '@mui/material';

export const StyledStepContainer = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontSize: '16px',
    backgroundColor: palette.primary.light,
    fontFamily: typography.smallLogo?.fontFamily,
    padding: spacing(0.5, 2),
    color: palette.grey[400],
    border: `1px solid ${palette.border.lightBlue}`,
    borderRadius: '8px',
  }),
);

export const StyledStepRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  gap: spacing(1),
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledStepColumn = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing(3),
}));

export const StyledTitle = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: '32px',
  fontWeight: '500',
  fontFamily: typography.mediumLogo?.fontFamily,
}));

export const StyledStepDescription = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: 400,
  }),
);

export const StyledStepBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
