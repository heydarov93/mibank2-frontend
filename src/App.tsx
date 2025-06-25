import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

import { AppContainer, OutletContainer } from 'App.styled';
import {
  Footer,
  Header,
  MainContentSwitcher,
  SidebarWrapper,
} from 'components/organisms';

Amplify.configure(awsExports);

export const App = () => {
  return (
    <AppContainer>
      <Header />
      <OutletContainer>
        <SidebarWrapper />
        <MainContentSwitcher />
      </OutletContainer>
      <Footer />
    </AppContainer>
  );
};
