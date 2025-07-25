import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { StyledIcon } from './TransactionIcon.styled';

export function TransactionIcon({ type }: { type: 'income' | 'expense' }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });
  const { palette } = useTheme();
  const typeIsIncome = type === 'income';
  const Icon = typeIsIncome ? ArrowDownwardRoundedIcon : ArrowUpwardRoundedIcon;
  const color = typeIsIncome ? palette.success.main : palette.error.main;

  return (
    <StyledIcon
      sx={{ border: `2px solid ${color}`, color: color }}
      role="img"
      aria-label={t('label.transaction')}
      data-testid="transaction-icon"
    >
      <Icon />
    </StyledIcon>
  );
}
