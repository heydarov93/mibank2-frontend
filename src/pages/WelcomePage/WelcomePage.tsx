import { Box } from '@mui/material';
import {
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { StyledContainer, StyledHeader } from './WelcomePage.styled';

import { Logo } from 'components/atoms';
import { TabPanel } from 'components/atoms/TabPanel/TabPanel';
import { Footer } from 'components/organisms';
import { WelcomeHeader } from 'components/organisms/WelcomeHeader';
import { WelcomeNav } from 'components/organisms/WelcomeNav/WelcomeNav';
import { EWelcomeTab } from 'enums/EWelcomeTab';
import { UnderDevPage } from 'pages/UnderDevPage/UnderDevPage';

const TAB_INDEX: Record<EWelcomeTab, number> = {
  [EWelcomeTab.Personal]: 0,
  [EWelcomeTab.Business]: 1,
  [EWelcomeTab.About]: 2,
};

const INDEX_TAB: Record<number, EWelcomeTab> = {
  0: EWelcomeTab.Personal,
  1: EWelcomeTab.Business,
  2: EWelcomeTab.About,
};

export const WelcomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as EWelcomeTab;
  const initialTab = tabParam && TAB_INDEX[tabParam] ? TAB_INDEX[tabParam] : 0;
  const [tabValue, setTabValue] = useState<number>(initialTab);

  useEffect(() => {
    const tabIdx = tabParam && TAB_INDEX[tabParam] ? TAB_INDEX[tabParam] : 0;
    setTabValue(tabIdx);
  }, [tabParam]);

  const handleTabChange = (_event: SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
    setSearchParams({ tab: INDEX_TAB[newTabValue] });
  };

  return (
    <>
      <StyledHeader>
        <WelcomeHeader activeTab={tabValue} onSetActiveTab={handleTabChange} />
        <StyledContainer>
          <Logo />
          <WelcomeNav activePanel={tabValue} />
        </StyledContainer>
      </StyledHeader>
      <Box marginTop="120px">
        <TabPanel value={tabValue} index={TAB_INDEX[EWelcomeTab.Personal]}>
          Personal Page
        </TabPanel>
        <TabPanel value={tabValue} index={TAB_INDEX[EWelcomeTab.Business]}>
          Business Page
        </TabPanel>
        <TabPanel value={tabValue} index={TAB_INDEX[EWelcomeTab.About]}>
          <UnderDevPage />
        </TabPanel>
      </Box>
      <Footer />
    </>
  );
};
