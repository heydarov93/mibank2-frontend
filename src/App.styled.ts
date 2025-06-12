import { Box, styled } from '@mui/material';

export const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const OutletContainer = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: spacing(5),
  marginBlock: spacing(4),
  paddingInline: spacing(4),
  marginInline: 'auto',
  width: '100%',
  minWidth: '1440px',
  maxWidth: '1920px',

  '& > :first-child': {
    maxWidth: 385,
  },
}));
