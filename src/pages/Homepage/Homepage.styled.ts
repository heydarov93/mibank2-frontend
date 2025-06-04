import { styled } from '@mui/material';

export const StyledCurrencyContainer = styled('div')(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(3),
    gap: spacing(4),

    '& > *': {
      width: '100%',
    },
  }),
);
