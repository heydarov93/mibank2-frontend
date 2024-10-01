import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';
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
      <div>{t('infoHintSpecial')}</div>
      <div>{t('infoHintSpecialCharacters')}</div>
    </Box>
  );

  return (
    <StyledErrorHint
      onMouseEnter={handleTooltipOpen}
      onMouseLeave={handleTooltipClose}
    >
      <BootstrapTooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top"
        title={title}
        sx={{
          opacity: 0.9,
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
      </BootstrapTooltip>
    </StyledErrorHint>
  );
};
