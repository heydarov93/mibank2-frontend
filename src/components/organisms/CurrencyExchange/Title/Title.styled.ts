import { styled, Typography } from '@mui/material';

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: theme.typography.smallLogo?.fontFamily,
  fontWeight: 600,
  fontSize: '26px',
  lineHeight: '28px',
}));

export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontFamily: theme.typography.smallLogo?.fontFamily,
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '20px',
}));
