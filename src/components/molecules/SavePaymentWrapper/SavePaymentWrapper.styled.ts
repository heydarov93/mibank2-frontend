import { Box, styled, TextField, Typography } from '@mui/material';

export const StyledCheckBox = styled(Box)(
  ({ theme: { typography, palette, spacing } }) => ({
    marginTop: spacing(4),
    '& .MuiFormControlLabel-label': {
      fontFamily: typography.mediumLogo?.fontFamily,
      color: palette.grey[400],
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
  }),
);

export const StyledInputLabel = styled(Typography)(
  ({ theme: { typography, palette, spacing } }) => ({
    marginBottom: spacing(0.5),
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
  }),
);

export const StyledInputField = styled(TextField)(
  ({ theme: { palette, spacing } }) => ({
    '& .MuiInputBase-input': {
      height: '30px',
      padding: spacing(1.5),
      borderRadius: '6px',
      border: `1px solid ${palette.border.lightBlue}`,
      backgroundColor: palette.primary.light,
    },
  }),
);
