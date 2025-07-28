import Box from '@mui/material/Box';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const StyledErrorHint = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    color: palette.common.black,
    paddingLeft: spacing(0.5),
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: 16,
      height: 16,
    },
  }),
);

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(({ theme: { breakpoints, palette, spacing } }) => {
  return {
    '& .MuiTooltip-tooltip': {
      backgroundColor: palette.grey[400],
      width: 255,
      maxWidth: 500,
      fontSize: 10,
      lineHeight: '14px',
      fontWeight: 500,
      margin: `0 ${spacing(1)} !important`,

      padding: `${spacing(0.5)} ${spacing(1)}`,

      [breakpoints.up('sm')]: {
        width: 350,
      },
    },

    '&.MuiTooltip-touch': {
      padding: `${spacing(0.5)} ${spacing(1)}`,
    },
  };
});
