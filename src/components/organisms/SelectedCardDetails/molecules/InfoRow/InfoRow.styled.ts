import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { TCardStatus } from 'types/types';

export const StyledInfoRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  gap: spacing(7),
}));

export const StyledInfoLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: '400',
    justifyContent: 'space-between',
    color: palette.grey[400],
    textTransform: 'uppercase',
    minWidth: '132px',
  }),
);

export const StyledInfoValue = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1,
  gap: spacing(1.25),
}));

export const StyledInfoText = styled(Typography)<{ status?: TCardStatus }>(
  ({ theme: { typography, palette }, status }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '100%',
    color:
      status === 'active'
        ? palette.success.main
        : status === 'blocked' || status === 'expired'
          ? palette.error.main
          : palette.common.black,
  }),
);

export const StyledMaskedText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '2px',
    color: palette.common.black,
  }),
);

export const StyledActionIcon = styled(IconButton)(
  ({ theme: { palette } }) => ({
    width: '22px',
    height: '22px',
    padding: '5px',
    color: palette.grey[400],

    '&:hover': {
      backgroundColor: palette.bg.lightBlue,
      color: palette.primary.main,
    },

    '.MuiSvgIcon-root': {
      fontSize: '22px',
    },
  }),
);
