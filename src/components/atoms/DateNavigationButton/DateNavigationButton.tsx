import { useTheme } from '@mui/material/styles';

import { ReactComponent as DateNavigationArrowSVG } from 'assets/icons/DateNavigationArrow.svg';

interface DateNavigationButtonProps {
  direction?: 'left' | 'right';
  handleClick?: () => void;
  disabled?: boolean;
}

export const DateNavigationButton = ({
  direction,
  handleClick,
  disabled,
}: DateNavigationButtonProps) => {
  const theme = useTheme();

  return (
    <DateNavigationArrowSVG
      style={{
        transform: `rotate(${direction === 'left' ? 0 : 180}deg)`,
        fill: disabled ? theme.palette.grey[100] : theme.palette.common.black,
        cursor: disabled ? 'initial' : 'pointer',
      }}
      onClick={disabled ? undefined : handleClick}
    />
  );
};
