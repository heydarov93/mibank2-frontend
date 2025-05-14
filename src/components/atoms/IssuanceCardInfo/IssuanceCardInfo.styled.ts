import { styled, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: 14,
  width: '50%',
}));
