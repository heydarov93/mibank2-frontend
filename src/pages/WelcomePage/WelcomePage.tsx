import { Box } from '@mui/material';
import { useState } from 'react';

import { StyledContainer } from './WelcomePage.styled';

import { Logo } from 'components/atoms';
import { TabPanel } from 'components/atoms/TabPanel/TabPanel';
import { Footer } from 'components/organisms';
import { WelcomeHeader } from 'components/organisms/WelcomeHeader';
import { WelcomeNav } from 'components/organisms/WelcomeNav/WelcomeNav';
import { UnderDevPage } from 'pages/UnderDevPage/UnderDevPage';

export const WelcomePage = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <header style={{ position: 'fixed', width: '100%', height: '120px' }}>
        <WelcomeHeader activeTab={value} onSetActiveTab={handleTabChange} />
        <StyledContainer>
          <Logo />
          <WelcomeNav activePanel={value} />
        </StyledContainer>
      </header>
      <Box marginTop="120px">
        <TabPanel value={value} index={0}>
          Personal Page
        </TabPanel>
        <TabPanel value={value} index={1}>
          Business Page
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UnderDevPage />
        </TabPanel>
      </Box>

      <Footer />
    </>
  );
};
