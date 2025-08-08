import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AvailableDepositsWindow } from '../AvailableDepositsWindow/AvailableDepositsWindow';
import { DepositDetailsDrawer } from '../DepositDetailsDrawer/DepositDetailsDrawer';
import { OpenDepositModal } from '../OpenDepositModal/OpenDepositModal';

import {
  StyledContainer,
  StyledPlusIconButton,
  StyledTitle,
} from './MyDepositsDetails.styled';
import MyDepositsAccordion from './organisms/MyDepositsAccordion';

import { useDisclosure } from 'hooks';
import { IDisplayDeposit } from 'models/IDeposit';

function MyDepositsDetails() {
  const [deposit, setDeposit] = useState<IDisplayDeposit | null>(null);
  const [learnDeposit, setLearnDeposit] = useState<IDisplayDeposit | null>(
    null,
  );
  const depositsModal = useDisclosure();
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  const depositLearnModal = useDisclosure();

  function handleSetDeposit(deposit: IDisplayDeposit) {
    setDeposit(deposit);
    depositsModal.close();
  }

  function handleBack() {
    handleCloseDepositModal();
    depositsModal.open();
  }

  function handleCloseDepositModal() {
    setDeposit(null);
  }

  function handleSetLearnDeposit(deposit: IDisplayDeposit) {
    setLearnDeposit(deposit);
    depositsModal.close();
    depositLearnModal.open();
  }

  function handleCloseLearnModal() {
    setLearnDeposit(null);
    depositLearnModal.close();
  }

  function handleBackLearnModal() {
    handleCloseLearnModal();
    depositsModal.open();
  }

  return (
    <StyledContainer>
      <Stack flexDirection="row" marginBottom={3} gap={2} alignItems="center">
        <StyledTitle data-testid="section-title">
          {t('myDeposits.title')}
        </StyledTitle>

        <StyledPlusIconButton
          onClick={depositsModal.open}
          data-testid="add-product-button"
        >
          <AddIcon sx={(theme) => ({ fontSize: theme.spacing(2.5) })} />
        </StyledPlusIconButton>
      </Stack>
      <Stack gap={2}>
        <MyDepositsAccordion />
        <MyDepositsAccordion />
        <MyDepositsAccordion />
      </Stack>
      <OpenDepositModal
        deposit={deposit}
        onClose={handleCloseDepositModal}
        onBack={handleBack}
      />
      <AvailableDepositsWindow
        open={depositsModal.isOpen}
        onClose={depositsModal.close}
        onSelectDeposit={handleSetDeposit}
        onSetLearnDeposit={handleSetLearnDeposit}
      />
      <DepositDetailsDrawer
        open={depositLearnModal.isOpen}
        data={learnDeposit}
        onClose={handleCloseLearnModal}
        onBack={handleBackLearnModal}
      />
    </StyledContainer>
  );
}

export default MyDepositsDetails;
