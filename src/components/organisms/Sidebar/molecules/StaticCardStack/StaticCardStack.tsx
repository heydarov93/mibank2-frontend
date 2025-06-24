import { Box } from '@mui/material';

import { StyledStaticCard } from './StaticCardStack.styled';

import { USER_CARD_WIDTH } from 'components/molecules/UserBankCard/UserBankCard.styled';

export function StaticCardStack() {
  return (
    <Box
      position="absolute"
      width={USER_CARD_WIDTH}
      height="100%"
      top={0}
      left="50%"
      borderRadius="12px"
      sx={{ translate: '-50% 0' }}
    >
      <StyledStaticCard
        bgcolor="userCardStack.card2"
        top="12px"
        sx={{
          transform: 'scale(0.90)',
          transformOrigin: 'bottom',
        }}
      />
      <StyledStaticCard
        bgcolor="userCardStack.card1"
        top="6px"
        sx={{
          transform: 'scale(0.96)',
          transformOrigin: 'bottom',
        }}
      />
      <StyledStaticCard bgcolor="common.white" top={0} />
    </Box>
  );
}
