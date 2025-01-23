import { Box, Button, styled } from '@mui/material';

export const DigitInput = styled('input')(({ theme: { palette } }) => ({
  width: '48px',
  height: '48px',
  border: `1px solid ${palette.grey[400]}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  boxSizing: 'border-box',
  padding: '0',
  '& input': {
    padding: '0',
    textAlign: 'center',
    outline: 'none',
  },
  borderRadius: '8px',
}));

export const StyledCancelContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingTop: spacing(3),

    [breakpoints.up('sm')]: {
      paddingTop: spacing(2),
    },
  }),
);

export const CancelButton = styled(Button)(
  ({ theme: { palette, breakpoints } }) => ({
    fontSize: '16px',
    padding: '12px 22px',
    height: '43px',
    borderRadius: '8px',
    border: `1px solid ${palette.primary.main}`,
    '&:hover': {
      borderColor: palette.primary.dark,
      color: palette.primary.dark,
      backgroundColor: palette.common.white,
    },
    '&:active': {
      borderColor: palette.primary.dark,
      color: palette.common.white,
      backgroundColor: palette.primary.dark,
    },

    '&.Mui-disabled': {
      opacity: '0.65',
      borderColor: palette.primary.main,
      color: palette.primary.main,
      background: palette.common.white,
    },

    [breakpoints.up('sm')]: {
      padding: '10px 22px',
      height: '56px',
      width: '84px',
    },
  }),
);
