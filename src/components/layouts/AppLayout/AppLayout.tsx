import { StyledAppContainer, StyledOutletContainer } from './AppLayout.styled';

import {
  Footer,
  Header,
  MainContentSwitcher,
  SidebarWrapper,
} from 'components/organisms';

export const AppLayout = () => {
  return (
    <StyledAppContainer>
      <Header />
      <StyledOutletContainer>
        <SidebarWrapper />
        <MainContentSwitcher />
      </StyledOutletContainer>
      <Footer />
    </StyledAppContainer>
  );
};
