import { Button, Stack, styled } from '@mui/material';

export const StyledModalButton = styled(Button)(({ theme: { spacing } }) => ({
  paddingTop: spacing(1.625),
  paddingBottom: spacing(1.625),
}));

export const StyledActionsWrapper = styled(Stack)(({ theme: { spacing } }) => ({
  gap: spacing(3),
  justifyContent: 'flex-end',
  minHeight: '56px',

  '.MuiButton-root': {
    minWidth: '113px',
  },
}));
