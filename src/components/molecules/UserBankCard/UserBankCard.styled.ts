import { styled } from '@mui/material';

export const StyledContainer = styled('div')(
  ({ theme: { spacing, palette } }) => ({
    backgroundColor: '#28438B', //!TODO need to get the actual background from server
    color: palette.common.white,
    width: 'min-content',
    padding: spacing(2),
    borderRadius: '12px',
  }),
);

export const StyledTopBox = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: spacing(21),
}));

export const StyledBtmBox = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: spacing(2),
}));
