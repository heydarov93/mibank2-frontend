import { Box, styled, Typography } from '@mui/material';

export const StyledLabelRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const StyledLabelRowText = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '100%',
  }),
);

export const StyledLabelBoldText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);
