import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { ReactComponent as LoadingIndicatorSVG } from 'assets/icons/LoadingIndicatorIcon.svg';

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

export const LoadingIndicator = styled(LoadingIndicatorSVG)({
  animation: 'spin 2.5s linear infinite',

  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});
