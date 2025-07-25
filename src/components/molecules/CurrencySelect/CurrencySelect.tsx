import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';

import { CurrencyFlagIcon } from 'components/atoms';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import { TCurrency } from 'types/types';

type CustomSelectProps = SelectProps & {
  disabledOptions?: string[];
};

export function CurrencySelect(props: CustomSelectProps) {
  const { disabledOptions, ...restProps } = props;

  const selectSx = {
    width: '120px',
    minWidth: '120px',
    '& .MuiOutlinedInput-notchedOutline': {
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
      {SUPPORTED_CURRENCIES.map((currency: TCurrency) => (
        <MenuItem
          sx={menuItemSx}
          key={currency}
          value={currency}
          disabled={disabledOptions?.includes(currency) ?? false}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <CurrencyFlagIcon currency={currency} />
            <Typography component="span" fontWeight={500}>
              {currency}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
