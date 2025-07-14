import { Box, CircularProgress } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptySection } from '../../molecules/EmptySection/EmptySection';
import { Transactions } from '../../molecules/Transactions/Transactions';

import { StyledTab, StyledTabs } from './MyTransactions.styled';
import { useGetTransactions } from './hooks/useGetTransactions';

import { TabPanel } from 'components/atoms';
import { TRANSACTION_FILTER_OPTIONS } from 'constants/business/transaction';

export function MyTransactions() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const { transactions, isLoading, isError } = useGetTransactions();

  if (isError) {
    return <EmptySection description={t('emptySectionConnectionError')} />;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (transactions.all.length === 0) {
    return <EmptySection />;
  }

  return (
    <>
      <StyledTabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        data-testid="my-transactions"
      >
        {TRANSACTION_FILTER_OPTIONS.map((tab, index) => (
          <StyledTab
            key={tab}
            label={tab}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </StyledTabs>

      <TabPanel value={tab} index={0}>
        <Transactions data={transactions.all} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Transactions data={transactions.income} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Transactions data={transactions.expenses} />
      </TabPanel>
    </>
  );
}
