import { ErrorOutline } from '@mui/icons-material';
import { Box, ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BootstrapTooltip, StyledErrorHint } from './PasswordTooltip.styled';

export const PasswordTooltip = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('translation');

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const title = (
    <Box>
      <div>{t('LoginPage.infoHintTitle')}</div>
      <div>{t('LoginPage.infoHintUpper')}</div>
      <div>{t('LoginPage.infoHintLower')}</div>
      <div>{t('LoginPage.infoHintDigit')}</div>
      <div>{t('LoginPage.infoHintSpecial')}</div>
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
