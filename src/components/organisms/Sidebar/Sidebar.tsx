import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './Sidebar.styled';
import { Container } from './molecules/Container/Container';
import { Section } from './molecules/Section/Section';

import { Deposit } from 'api/getDepositsApi';
import {
  AvailableDepositsWindow,
  IssueCardModal,
  OpenDepositModal,
} from 'components/organisms';
import useDisclosure from 'hooks/useDisclosure';

export function Sidebar() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'MainPage.sidebar',
  });
  const issueCardModal = useDisclosure();
  const availableDepositsModal = useDisclosure();
  const [deposit, setDeposit] = useState<Deposit | null>(null);

  function handleSetDeposit(deposit: Deposit) {
    setDeposit(deposit);
    availableDepositsModal.close();
  }

  function handleBack() {
    handleCloseDepositModal();
    availableDepositsModal.open();
  }

  function handleCloseDepositModal() {
    setDeposit(null);
  }

  return (
    <>
      <Container>
        <Section
          title={t('myCards.title')}
          onAddProduct={issueCardModal.open}
          onSeeAll={() => ''}
        />
        <Section title={t('myTransactions.title')} onSeeAll={() => ''} />
        <Section
          title={t('myLoans.title')}
          onAddProduct={() => ''}
          onSeeAll={() => ''}
        />
        <Section
          title={t('myDeposits.title')}
          onAddProduct={availableDepositsModal.open}
          onSeeAll={() => ''}
        />
        <StyledButton variant="contained" endIcon={<AddIcon />}>
          {t('addNewProduct')}
        </StyledButton>
      </Container>

      <AvailableDepositsWindow
        open={availableDepositsModal.isOpen}
        onClose={availableDepositsModal.close}
        onSetDeposit={handleSetDeposit}
      />
      <OpenDepositModal
        deposit={deposit}
        onClose={handleCloseDepositModal}
        onBack={handleBack}
      />
      <IssueCardModal
        open={issueCardModal.isOpen}
        onClose={issueCardModal.close}
      />
    </>
  );
}
