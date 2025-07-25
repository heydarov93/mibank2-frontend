import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { CurrencyFlagIcon } from 'components/atoms';
import { TCurrency } from 'types/types';

export const CurrencyBox = memo<{ currency: TCurrency }>(
  ({ currency }: { currency: TCurrency }) => (
    <Box
      component="span"
      role="text"
      aria-label={currency}
      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
    >
      <CurrencyFlagIcon currency={currency} aria-hidden="true" />
      <Typography
        component="span"
        variant="body2"
        fontWeight={500}
        lineHeight="unset"
        color="common.black"
      >
        {currency}
      </Typography>
    </Box>
  ),
);

CurrencyBox.displayName = 'CurrencyBox ';
