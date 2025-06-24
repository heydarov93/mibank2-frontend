import { styled } from '@mui/material';

export const USER_CARD_WIDTH = 288;

export const StyledContainer = styled('div')(
  ({ theme: { spacing, palette } }) => ({
    backgroundColor: '#28438B', //!TODO need to get the actual background from server
    color: palette.common.white,
    padding: spacing(2),
    borderRadius: '12px',
    width: '100%',
    maxWidth: USER_CARD_WIDTH,
  }),
);

export const StyledTopBox = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

export const StyledBtmBox = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: spacing(2),
}));
