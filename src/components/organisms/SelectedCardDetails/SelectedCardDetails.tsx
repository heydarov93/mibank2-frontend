import { Alert, CircularProgress } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetUserCardDetails } from '../Sidebar/organisms/MyCards/hooks/useGetUserCardDetails';

import {
  StyledContainer,
  StyledHeader,
  StyledPrimaryLabel,
  StyledTitle,
} from './SelectedCardDetails.styled';
import ButtonGroup from './molecules/ButtonGroup/ButtonGroup';
import InfoTab from './molecules/InfoTab/InfoTab';
import InfoTabs from './molecules/InfoTabs/InfoTabs';

import { ECardInfoTab } from 'enums/ECardInfoTab';
import { IUserBankCard } from 'models/IUserBankCard';

export const SelectedCardDetails = ({
  selectedCardId,
}: {
  selectedCardId: IUserBankCard['id'];
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const [activeTab, setActiveTab] = useState<string>(ECardInfoTab.Information);
  const {
    data: userCardDetails,
    isLoading,
    isError,
  } = useGetUserCardDetails(selectedCardId);

  const handleTabChange = (_: SyntheticEvent, newValue: string) =>
    setActiveTab(newValue);

  if (isLoading) {
    return (
      <StyledContainer>
        <CircularProgress data-testid="loading-spinner" />
      </StyledContainer>
    );
  }

  if (isError) {
    return (
      <StyledContainer>
        <Alert severity="error" data-testid="error-alert">
          {t('errors.failedToLoadCardDetails')}
        </Alert>
      </StyledContainer>
    );
  }

  if (!userCardDetails) {
    return (
      <StyledContainer>
        <Alert severity="warning" data-testid="no-data-alert">
          {t('errors.notFoundCardDetails')}
        </Alert>
      </StyledContainer>
    );
  }

  const isPrimaryCard = userCardDetails.isPrimary;
  const showInformationTab = activeTab === ECardInfoTab.Information;

  return (
    <StyledContainer data-testid="container">
      <StyledHeader data-testid="header">
        <StyledTitle data-testid="title">{t('title')}</StyledTitle>

        {isPrimaryCard && (
          <StyledPrimaryLabel>{t('primaryCardLabel')} ★</StyledPrimaryLabel>
        )}

        <ButtonGroup
          data-testid="button-group"
          selectedUserCardDetails={userCardDetails}
        />
      </StyledHeader>

      <InfoTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {showInformationTab && (
        <InfoTab selectedUserCardDetails={userCardDetails} />
      )}
    </StyledContainer>
  );
};
