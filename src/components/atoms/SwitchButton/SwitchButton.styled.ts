import { styled, Switch, Typography } from '@mui/material';

export const StyledSwitch = styled(Switch)(({ theme: { palette } }) => ({
  width: 34,
  height: 17,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(17px)',
      color: palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: palette.primary.main,
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 13,
    height: 13,
    backgroundColor: palette.common.white,
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 8.5,
    backgroundColor: palette.grey[400],
    opacity: 1,
  },
}));

export const SwitchTitle = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
  fontSize: typography.mediumLogo?.fontSize,
}));
