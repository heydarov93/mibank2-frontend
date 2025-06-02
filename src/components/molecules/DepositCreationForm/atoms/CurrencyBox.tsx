import { Box, InputAdornment, Typography } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';

const CurrencyBox = ({ currency }: { currency: string }) => {
  const countryCode = currency?.slice(0, 2).toLocaleLowerCase();
  
  return (
    <InputAdornment position="end">
      <Box display="flex" alignItems="center" gap="8px">
        <Box width={30} height={30}>
          <CircleFlag countryCode={countryCode} height="30" />
        </Box>
        <Typography sx={{ fontWeight: 500 }}>{currency}</Typography>
      </Box>
    </InputAdornment>
  );
};

export default CurrencyBox;
