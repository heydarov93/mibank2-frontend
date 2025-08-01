import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material/styles';
import { SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface CardInfoButtonProps {
  clicked: boolean;
  onClick: (value: SetStateAction<boolean>) => void;
  disabled: boolean;
  sx?: SxProps;
}

export function CardInfoButton({
  clicked,
  onClick,
  disabled,
  sx,
}: CardInfoButtonProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar.myCards',
  });

  const handleVisibilityToggle = () => {
    onClick((v) => !v);
  };

  const Icon = useMemo(
    () => (clicked ? KeyboardArrowUpIcon : KeyboardArrowDownIcon),
    [clicked],
  );

  const ariaLabel = useMemo(() => (clicked ? 'Collapse' : 'Expand'), [clicked]);

  return (
    <Button
      sx={{
        fontFamily: 'inherit',
        fontWeight: 500,
        background: 'unset !important',
        ...sx,
      }}
      disableRipple
      size="small"
      aria-expanded={clicked}
      aria-label={ariaLabel}
      onClick={handleVisibilityToggle}
      endIcon={<Icon aria-hidden="true" focusable="false" />}
      disabled={disabled}
    >
      {t('cardInfo')}
    </Button>
  );
}
