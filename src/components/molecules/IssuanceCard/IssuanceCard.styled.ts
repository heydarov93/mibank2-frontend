import { Box, styled, Typography } from '@mui/material';

export const CardWrapper = styled(Box)<{ background: string }>(
  ({ theme, background }) => ({
    borderRadius: '12px',
    color: theme.palette.common.white,
    flexShrink: 0,
    width: '344px',
    height: '206px',
    padding: theme.spacing(4),
    background,
  }),
);

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: 14,
  width: '50%',
  lineHeight: 1.15,
}));
