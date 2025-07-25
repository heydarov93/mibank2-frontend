import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';


import {
  StyledContainer,
  StyledHeader,
  StyledPrimaryLabel,
  StyledTitle,
} from './SelectedCardDetails.styled';
import { ButtonGroup, InfoTab, InfoTabs } from './molecules';

import { ECardInfoTab } from 'enums/ECardInfoTab';
import { useGetUserCardDetails } from 'hooks/useGetUserCardDetails';
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

      <InfoTabs
        data-active={activeTab}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {showInformationTab && (
        <InfoTab selectedUserCardDetails={userCardDetails} />
      )}
    </StyledContainer>
  );
};
