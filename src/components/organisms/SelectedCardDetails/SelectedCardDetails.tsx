import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
} from './SelectedCardDetails.styled';
import ButtonGroup from './molecules/ButtonGroup';
import InfoTab from './molecules/InfoTab';
import InfoTabs from './molecules/InfoTabs';

import { ECardInfoTab } from 'enums/ECardInfoTab';

// TODO: this interface properties are not yet completely accurate
export interface CardData {
  status: string;
  cardHolder: string;
  cardNumber: string;
  cvv: string;
  iban: string;
  swiftBic: string;
  issueDate: string;
  cashbackRate: string;
}

interface CardDetailsProps {
  cardDetails?: CardData;
}

// TODO: this mock data will replaced by real fetched data from backend api
const mockCardData: CardData = {
  status: 'Active',
  cardHolder: 'Grzegorz Brzeczyszczykiewicz',
  cardNumber: '•••• 5846',
  cvv: '•••',
  iban: 'US12 1116 6660 0000 0001 2345 678',
  swiftBic: 'YOLOPLPP',
  issueDate: '20.12.2012',
  cashbackRate: '1%',
};

export const SelectedCardDetails = ({ cardDetails }: CardDetailsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const [activeTab, setActiveTab] = useState<string>(ECardInfoTab.Information);
  const cardData = cardDetails || mockCardData;

  const handleTabChange = (_: SyntheticEvent, newValue: string) =>
    setActiveTab(newValue);

  return (
    <StyledContainer data-testid="container">
      <StyledHeader data-testid="header">
        <StyledTitle data-testid="title">{t('title')}</StyledTitle>
        <ButtonGroup data-testid="button-group" />
      </StyledHeader>

      <InfoTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === ECardInfoTab.Information && (
        <InfoTab cardData={cardData} />
      )}
    </StyledContainer>
  );
};
