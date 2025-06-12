import { useTheme } from '@mui/material';

import { ReactComponent as DateNavigationArrow } from 'assets/icons/DateNavigationArrow.svg';

interface CalendarButtonProps {
  direction?: 'left' | 'right';
  handleClick?: () => void;
  disabled?: boolean;
}

export const CalendarButton = ({
  direction,
  handleClick,
  disabled,
}: CalendarButtonProps) => {
  const theme = useTheme();

  return (
    <DateNavigationArrow
      style={{
        transform: `rotate(${direction === 'left' ? 0 : 180}deg)`,
        fill: disabled ? theme.palette.grey[100] : theme.palette.common.black,
        cursor: disabled ? 'initial' : 'pointer',
      }}
      onClick={disabled ? undefined : handleClick}
    />
  );
};
