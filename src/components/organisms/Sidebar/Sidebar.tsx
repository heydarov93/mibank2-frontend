import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { createSearchParams } from 'react-router-dom';

import { DashboardDeposits } from '../DashboardDeposits/DashboardDeposits';
import { MyCardsSection } from '../MyCardsSection/MyCardsSection';
import { MyTransactionsSection } from '../MyTransactionsSection/MyTransactionsSection';

import { StyledButton } from './Sidebar.styled';
import { Container, EmptySection, Section } from './molecules';

import { TO_HISTORY, TO_HOME } from 'constants/navigation/routePaths';

interface SidebarProps {
  onIssueCardModalOpen: () => void;
  onDepositsModalOpen: () => void;
}

export function Sidebar({
  onIssueCardModalOpen,
  onDepositsModalOpen,
}: SidebarProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  const cardsViewSearchParam = createSearchParams({ view: 'cards' }).toString();
  const depositsViewSearchParam = createSearchParams({
    view: 'deposits',
  }).toString();

  return (
    <Container>
      <Section
        title={t('myCards.title')}
        onAddProduct={onIssueCardModalOpen}
        seeAllRoute={{ search: cardsViewSearchParam }}
      >
        <MyCardsSection />
      </Section>
      <Section title={t('myTransactions.title')} seeAllRoute={TO_HISTORY}>
        <MyTransactionsSection />
      </Section>
      <Section
        title={t('myLoans.title')}
        onAddProduct={() => ''}
        seeAllRoute={TO_HOME}
      >
        <EmptySection />
      </Section>
      <Section
        title={t('myDeposits.title')}
        onAddProduct={onDepositsModalOpen}
        seeAllRoute={`${TO_HOME}?${depositsViewSearchParam}`}
      >
        <DashboardDeposits />
      </Section>
      <StyledButton variant="contained" endIcon={<AddIcon />}>
        {t('addNewProduct')}
      </StyledButton>
    </Container>
  );
}
