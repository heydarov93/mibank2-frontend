import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
}));

export const MainText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  fontFamily: 'Urbanist',
  fontSize: '18px',
  color: isActive ? theme.palette.common.white : theme.palette.grey[300],
  lineHeight: '28px',
}));
