import { Box, styled } from '@mui/material';

export const PageContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing(2),
  maxWidth: '1030px',
  minWidth: '1030px',
}));
