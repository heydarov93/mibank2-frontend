import { DialogTitle, Paper, styled, Typography } from '@mui/material';

const borderRadiusStyles = {
  borderRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
};

export const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '92px',
  ...borderRadiusStyles,
}));

export const StyledDialogBody = styled(Paper)(() => ({
  '&&': {
    overflow: 'visible',
    maxWidth: 482,
    ...borderRadiusStyles,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}));
