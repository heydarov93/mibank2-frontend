import { useState } from 'react';

import { PageContainer } from './AllCardsPage.styled';

import { AllCardsSlider, SelectedCardDetails } from 'components/organisms';
import { IUserBankCard } from 'models/IUserCard';

export const AllCardsPage = () => {
  const [selectedCard, setSelectedCard] = useState<IUserBankCard>();

  const handleCardSelect = (card: IUserBankCard) => {
    setSelectedCard(card);
  };

  return (
    <PageContainer>
      <AllCardsSlider
        onCardSelect={handleCardSelect}
        selectedCardId={selectedCard ? selectedCard.id : ''}
      />
      {selectedCard && <SelectedCardDetails selectedCard={selectedCard} />}
    </PageContainer>
  );
};
