import { Box, Typography } from '@mui/material';

import { CurrencyFlagIcon } from 'components/atoms';
import { TCurrency } from 'types/card';

export const CurrencyBox = ({ currency }: { currency: TCurrency }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <CurrencyFlagIcon currency={currency} />
    <Typography fontWeight={500} lineHeight="unset" color="common.black">
      {currency}
    </Typography>
  </Box>
);
