import { Box, styled, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  lineHeight: 1.5,
}));

export const StyledButton = styled(Box)(({ theme }) => ({
  textDecoration: 'underline',
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 500,
}));
