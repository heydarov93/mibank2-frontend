import { Fade, Collapse, Box } from '@mui/material';
import { useState } from 'react';

import { StyledContainer } from './AllCardsPage.styled';

import { AllCardsSlider, SelectedCardDetails } from 'components/organisms';
import { COLLAPSE_TIMEOUT, FADE_TIMEOUT } from 'constants/ui/layout';
import { IUserBankCard } from 'models/IUserBankCard';

export const AllCardsPage = () => {
  const [selectedCardId, setSelectedCardId] = useState<IUserBankCard['id']>('');

  const handleCardIdSelect = (id: IUserBankCard['id']) => {
    setSelectedCardId((prevSelectedCardId) =>
      prevSelectedCardId === id ? '' : id,
    );
  };

  return (
    <StyledContainer>
      <AllCardsSlider
        onCardIdSelect={handleCardIdSelect}
        selectedCardId={selectedCardId}
      />
      <Collapse
        in={!!selectedCardId}
        timeout={COLLAPSE_TIMEOUT}
        sx={{ width: '100%' }}
        data-testid="collapse-wrapper"
      >
        <Fade
          in={!!selectedCardId}
          timeout={FADE_TIMEOUT}
          data-testid="fade-wrapper"
        >
          <Box data-testid="box-wrapper">
            <SelectedCardDetails
              selectedCardId={selectedCardId}
              data-testid="selected-card-details"
            />
          </Box>
        </Fade>
      </Collapse>
    </StyledContainer>
  );
};
