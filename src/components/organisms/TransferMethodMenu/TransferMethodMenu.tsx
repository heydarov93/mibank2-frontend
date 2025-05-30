import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import {
  transferMethods,
  TTransferMethod,
} from 'pages/TransfersPage/TransfersPage';

export function TransferMethodMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const transferMethod = searchParams.get('method') as TTransferMethod;
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item: TTransferMethod) => () => {
    setSearchParams({ method: item });
    handleClose();
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          fontWeight: 400,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        disableElevation
        disableRipple
      >
        {t(transferMethod)}
      </Button>
      <Menu
        slotProps={{
          paper: { sx: { borderRadius: '8px' } },
        }}
        MenuListProps={{ sx: { paddingBlock: 0 } }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {Object.values(transferMethods).map((item) => (
          <MenuItem
            sx={{
              paddingBlock: 1,
              '&:hover': {
                backgroundColor: 'primary.light',
              },
              '&:active': {
                backgroundColor: 'primary.main',
                color: 'common.white',
              },
            }}
            onClick={handleSelect(item)}
            disableRipple
            key={item}
          >
            {t(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
