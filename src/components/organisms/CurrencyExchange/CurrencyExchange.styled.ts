import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: spacing(3),
  gap: spacing(4),
  '& > *': {
    width: '100%',
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: 'Urbanist',
  fontWeight: 600,
  fontSize: '26px',
  lineHeight: '28px',
}));

export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '20px',
}));
