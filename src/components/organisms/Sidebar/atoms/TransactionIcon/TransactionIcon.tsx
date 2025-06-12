import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useTheme } from '@mui/material';

import { StyledIcon } from './TransactionIcon.styled';

export function TransactionIcon({ type }: { type: 'income' | 'expense' }) {
  const theme = useTheme();
  const typeIsIncome = type === 'income';

  const Icon = typeIsIncome ? ArrowDownwardRoundedIcon : ArrowUpwardRoundedIcon;
  const color = typeIsIncome
    ? theme.palette.success.main
    : theme.palette.error.main;

  return (
    <StyledIcon
      sx={{ border: `2px solid ${color}`, color: color }}
      data-testid="transaction-icon"
    >
      <Icon />
    </StyledIcon>
  );
}
