import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ETransferMethod } from '../TransferForm/enums/ETransferMethod';

interface TransferMethodMenuProps {
  transferMethod: ETransferMethod;
  onSetMethod: (arg: ETransferMethod) => void;
}

export function TransferMethodMenu({
  transferMethod,
  onSetMethod,
}: TransferMethodMenuProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item: ETransferMethod) => () => {
    onSetMethod(item);
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {(Object.values(ETransferMethod) as ETransferMethod[]).map((item) => (
          <MenuItem onClick={handleSelect(item)} disableRipple key={item}>
            {t(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
