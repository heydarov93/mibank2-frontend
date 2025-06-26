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
import { IUserBankCard } from 'models/IUserBankCard';

interface CardDetailsProps {
  selectedCard: IUserBankCard;
}

export const SelectedCardDetails = ({ selectedCard }: CardDetailsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const [activeTab, setActiveTab] = useState<string>(ECardInfoTab.Information);

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
        <InfoTab selectedCard={selectedCard} />
      )}
    </StyledContainer>
  );
};
