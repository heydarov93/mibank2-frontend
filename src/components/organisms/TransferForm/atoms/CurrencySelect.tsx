import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, MenuItem, Select } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import currencies from 'constants/currencies';

const currencyToCountryCode: { [key: string]: string } = {
  PLN: 'pl',
  USD: 'us',
  EUR: 'eu',
  CHF: 'ch',
  GBP: 'uk',
  JPY: 'jp',
};

interface CurrencySelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function CurrencySelect<T extends FieldValues>({
  name,
  control,
}: CurrencySelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'PLN' as never}
      render={({ field }) => (
        <Select
          {...field}
          sx={{
            '& .MuiSelect-select': {
              '&:focus': {
                backgroundColor: 'transparent !important',
              },
            },
          }}
          variant="standard"
          disableUnderline
          IconComponent={KeyboardArrowDownIcon}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              <Box display="flex" alignItems="center" gap="8px">
                <Box width={30} height={30}>
                  <CircleFlag
                    countryCode={currencyToCountryCode[currency]}
                    height="30"
                  />
                </Box>
                <span style={{ fontWeight: 500 }}>{currency}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
