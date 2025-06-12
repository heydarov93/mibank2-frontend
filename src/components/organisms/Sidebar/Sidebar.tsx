import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './Sidebar.styled';
import { Container } from './molecules/Container/Container';
import { EmptySection } from './molecules/EmptySection/EmptySection';
import { Section } from './molecules/Section/Section';
import { MyTransactions } from './organisms/MyTransactions/MyTransactions';

import { TO_HISTORY } from 'constants/routesName';

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

  return (
    <Container>
      <Section
        title={t('myCards.title')}
        onAddProduct={onIssueCardModalOpen}
        seeAllRoute="/"
      >
        <EmptySection />
      </Section>
      <Section title={t('myTransactions.title')} seeAllRoute={TO_HISTORY}>
        <MyTransactions />
      </Section>
      <Section
        title={t('myLoans.title')}
        onAddProduct={() => ''}
        seeAllRoute="/"
      >
        <EmptySection />
      </Section>
      <Section
        title={t('myDeposits.title')}
        onAddProduct={onDepositsModalOpen}
        seeAllRoute="/"
      >
        <EmptySection />
      </Section>
      <StyledButton variant="contained" endIcon={<AddIcon />}>
        {t('addNewProduct')}
      </StyledButton>
    </Container>
  );
}
