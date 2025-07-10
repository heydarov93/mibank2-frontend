import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    marginBottom: 0,
    fontSize: '32px',
    fontWeight: 500,
    color: palette.common.black,
  }),
);

export const StyledText = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    textAlign: 'center',
    marginTop: spacing(1),
    fontSize: '16px',
    fontWeight: 400,
    color: palette.common.black,
  }),
);

export const StyledFlexRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing(0.5),
}));

export const StyledButton = styled(Button)(
  ({ theme: { spacing, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    padding: spacing(0.25, 1),
  }),
);
