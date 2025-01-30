import { Box, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
}));

export const MainText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Urbanist',
  fontSize: '18px',
  color: theme.palette.grey[300],
  lineHeight: '28px',
}));
