import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, MenuItem, Select, SelectProps, Theme } from '@mui/material';

import { CurrencyFlagIcon } from 'components/atoms';
import currencies from 'constants/currencies';
import { TCurrency } from 'models/types';

type CustomSelectProps = SelectProps & {
  disabledOptions?: string[];
};

export function CurrencySelect(props: CustomSelectProps) {
  const { disabledOptions, ...restProps } = props;

  const selectSx = {
    width: '120px',
    minWidth: '120px',
    fieldset: {
      border: 'none',
    },
  };

  const menuPaperSx = (theme: Theme) => ({
    borderRadius: theme.spacing(1),
    boxShadow: `0 4px 12px ${theme.palette.shadow.shadowLight}`,
    border: `1px solid ${theme.palette.border.lightBlue}`,
    marginTop: theme.spacing(0.5),
  });

  const menuItemSx = (theme: Theme) => ({
    paddingBlock: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'primary.light',
    },
    '&:active': {
      backgroundColor: 'primary.main',
      color: 'common.white',
    },
  });

  return (
    <Select
      {...restProps}
      MenuProps={{
        slotProps: {
          paper: { sx: menuPaperSx },
        },
        MenuListProps: { sx: { paddingBlock: 0 } },
      }}
      sx={{ ...selectSx, ...restProps.sx }}
      IconComponent={KeyboardArrowDownIcon}
    >
      {currencies.map((currency: TCurrency) => (
        <MenuItem
          sx={menuItemSx}
          key={currency}
          value={currency}
          disabled={disabledOptions?.includes(currency) ?? false}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <CurrencyFlagIcon currency={currency} />
            <span style={{ fontWeight: 500 }}>{currency}</span>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
