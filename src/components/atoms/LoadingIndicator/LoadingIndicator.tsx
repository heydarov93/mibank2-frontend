import { styled } from '@mui/material';

import { ReactComponent as LoadingIndicatorIcon } from 'assets/icons/LoadingIndicatorIcon.svg';

export const LoadingIndicator = styled(LoadingIndicatorIcon)({
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
