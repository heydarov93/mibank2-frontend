import { Box, styled, Typography } from '@mui/material';

export const StyledHeader = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  color: theme.palette.grey[300],
  fontFamily: 'Urbanist',
}));

export const ProductsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
}));
