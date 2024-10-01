import { styled, Box } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export const StyledErrorHint = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    color: palette.common.black,
    paddingLeft: spacing(0.5),
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      position: 'absolute',
      width: 16,
      height: 16,
      translate: '-30px',
      transform: 'scale(0.85)',
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
      maxWidth: 225,
      fontSize: 10,
      lineHeight: '14px',
      fontWeight: 400,
      margin: `0 ${spacing(0, 0.5)} !important`,

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
