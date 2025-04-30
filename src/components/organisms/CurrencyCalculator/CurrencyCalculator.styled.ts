import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(() => ({
  maxWidth: '480px',
}));

export const StyledInputsColumn = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
}));

export const StyledCurrencyText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    color: palette.grey[400],
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '20px',
    letterSpacing: '0px',
    marginTop: '8px',
  }),
);

export const StyledSwapIcon = styled(Box)(({ theme: { palette } }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50px',
  textAlign: 'center',
  margin: 'auto',
  borderRadius: '8px',
  backgroundColor: palette.primary.main,
}));
