import { Dialog, styled } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '520px',
    borderRadius: '8px',
    padding: theme.spacing(5),
  },
}));
