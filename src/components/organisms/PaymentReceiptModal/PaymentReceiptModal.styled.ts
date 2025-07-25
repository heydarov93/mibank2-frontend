import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '92px',
  borderRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export const StyledDialogBody = styled(Paper)(() => ({
  '&&': {
    overflow: 'visible',
    maxWidth: 482,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}));
