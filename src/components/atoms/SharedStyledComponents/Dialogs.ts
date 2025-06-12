import { Button, Dialog, Stack, styled } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '520px',
    borderRadius: '8px',
    padding: theme.spacing(5),
  },
}));

export const StyledActionsWrapper = styled(Stack)(({ theme: { spacing } }) => ({
  gap: spacing(3),
  justifyContent: 'flex-end',
  minHeight: '56px',
  '.MuiButton-root': {
    minWidth: '113px',
  },
}));

export const StyledModalButton = styled(Button)(({ theme: { spacing } }) => ({
  paddingTop: spacing(1.625),
  paddingBottom: spacing(1.625),
}));

StyledActionsWrapper.defaultProps = {
  direction: 'row',
};
