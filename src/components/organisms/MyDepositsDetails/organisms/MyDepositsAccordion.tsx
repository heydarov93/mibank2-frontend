import { Box, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledDepositTab,
} from '../MyDepositsDetails.styled';
import InformationTabContent from '../molecules/InformationTabContent';

import MyDepositsSummary from './MyDepositsSummary';

import { TabPanel } from 'components/atoms';
import { EmptySection } from 'components/organisms/Sidebar/molecules';

function MyDepositsAccordion() {
  const [value, setValue] = useState(1);

  const { t } = useTranslation('translation', {
    keyPrefix: 'myDepositsPage',
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <StyledAccordion>
      <MyDepositsSummary />
      <StyledAccordionDetails>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label={t('tabAriaLabel')}
              centered
            >
              <StyledDepositTab label={t('transactionsTabLabel')} />
              <StyledDepositTab label={t('informationTabLabel')} />
              <StyledDepositTab label={t('withdrawalTabLabel')} />
            </Tabs>
          </Box>
          <TabPanel index={0} value={value}>
            <Box padding={3}>
              <EmptySection />
            </Box>
          </TabPanel>
          <TabPanel index={1} value={value}>
            <InformationTabContent />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <Box padding={3}>
              <EmptySection />
            </Box>
          </TabPanel>
        </Box>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
}

export default MyDepositsAccordion;
