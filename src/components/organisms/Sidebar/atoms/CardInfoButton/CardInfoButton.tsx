import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, SxProps } from '@mui/material';
import { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

export function CardInfoButton({
  clicked,
  onClick,
  disabled,
  sx,
}: {
  clicked: boolean;
  onClick: (value: SetStateAction<boolean>) => void;
  disabled: boolean;
  sx?: SxProps;
}) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar.myCards',
  });

  function handleVisibilityToggle() {
    onClick((v) => !v);
  }

  return (
    <Button
      disableRipple
      sx={{
        fontFamily: 'inherit',
        fontWeight: 500,
        background: 'unset !important',
        ...sx,
      }}
      onClick={handleVisibilityToggle}
      aria-label="expand"
      size="small"
      endIcon={clicked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      disabled={disabled}
    >
      {t('cardInfo')}
    </Button>
  );
}
