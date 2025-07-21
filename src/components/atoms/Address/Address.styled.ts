import { Box, styled, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)(
  ({ theme: { palette } }) => ({
    color: palette.grey[400],
    lineHeight: 1.5,
  }),
);

export const StyledButton = styled(Box)(({ theme: { palette } }) => ({
  textDecoration: 'underline',
  color: palette.primary.dark,
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 500,
}));
