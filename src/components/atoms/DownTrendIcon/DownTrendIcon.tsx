import { TrendingDown } from '@mui/icons-material';
import { SvgIcon, SxProps, Theme } from '@mui/material';

interface DownTrendIconProps {
  color?: string;
  sx?: SxProps<Theme>;
}

const DownTrendIcon = ({ color, sx, ...props }: DownTrendIconProps) => {
  return (
    <SvgIcon sx={{ color: color, ...sx }} {...props}>
      <TrendingDown />
    </SvgIcon>
  );
};

export default DownTrendIcon;
