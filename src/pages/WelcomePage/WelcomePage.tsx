import { Box } from '@mui/material';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { StyledContainer, StyledHeader } from './WelcomePage.styled';

import { Logo, TabPanel } from 'components/atoms';
import { Footer, WelcomeHeader, WelcomeNavbar } from 'components/organisms';
import { WELCOME_TABS } from 'constants/ui/content';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';
import { EWelcomeTab } from 'enums';
import { UnderDevPage } from 'pages/UnderDevPage/UnderDevPage';

export const WelcomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultIndex = useMemo(() => {
    const tab = searchParams.get('tab') as EWelcomeTab;
    const idx = tab ? WELCOME_TABS.indexOf(tab) : -1;
    return idx >= 0 ? idx : 0;
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState<number>(defaultIndex);

  useEffect(() => {
    setActiveTab(defaultIndex);
  }, [defaultIndex]);

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newIndex: number) => {
      setActiveTab(newIndex);
      setSearchParams({ tab: WELCOME_TABS[newIndex] });
    },
    [setSearchParams],
  );

  return (
    <>
      <StyledHeader>
        <WelcomeHeader activeTab={activeTab} onTabChange={handleTabChange} />
        <StyledContainer>
          <Logo size={DEFAULT_BREAKPOINT_KEYS.md} />
          <WelcomeNavbar activePanel={activeTab} />
        </StyledContainer>
      </StyledHeader>
      <Box mt={15}>
        {WELCOME_TABS.map((tab, index) => (
          <TabPanel key={tab} value={activeTab} index={index}>
            <UnderDevPage />
          </TabPanel>
        ))}
      </Box>
      <Footer />
    </>
  );
};
