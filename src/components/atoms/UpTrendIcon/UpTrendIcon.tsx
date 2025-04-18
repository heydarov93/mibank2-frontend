import { TrendingUp } from '@mui/icons-material';
import { SvgIcon, SxProps, Theme } from '@mui/material';

interface UpTrendIconProps {
  color?: string;
  sx?: SxProps<Theme>;
}

const UpTrendIcon = ({ color, sx, ...props }: UpTrendIconProps) => {
  return (
    <SvgIcon sx={{ color: color, ...sx }} {...props}>
      <TrendingUp />
    </SvgIcon>
  );
};

export default UpTrendIcon;
