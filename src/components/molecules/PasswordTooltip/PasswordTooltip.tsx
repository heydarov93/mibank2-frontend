import ErrorOutline from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BootstrapTooltip, StyledErrorHint } from './PasswordTooltip.styled';

export const PasswordTooltip = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'LoginPage',
  });

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const title = (
    <Box>
      <div>{t('infoHintTitle')}</div>
      <div>{t('infoHintUpper')}</div>
      <div>{t('infoHintLower')}</div>
      <div>{t('infoHintDigit')}</div>
      <div>{t('infoHintSpecial')}</div>
    </Box>
  );

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <StyledErrorHint onClick={handleTooltipOpen}>
          <BootstrapTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="right-end"
            title={title}
            sx={{
              opacity: 0.9,
            }}
          >
            <ErrorOutline fontSize="small" />
          </BootstrapTooltip>
        </StyledErrorHint>
      </div>
    </ClickAwayListener>
  );
};
