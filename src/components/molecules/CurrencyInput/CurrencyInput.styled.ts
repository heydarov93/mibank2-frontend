import { Box, styled, Typography } from '@mui/material';

export const StyledInputContainer = styled(Box)(({ theme: { palette } }) => ({
  padding: '18px',
  border: `1px solid ${palette.border.lightBlue}`,
  borderRadius: '16px',
  boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
}));

export const StyledInputRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

export const StyledInputLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: 400,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '20px',
    letterSpacing: '0px',
    marginBottom: '12px',
  }),
);
