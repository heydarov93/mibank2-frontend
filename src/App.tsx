import { Amplify } from 'aws-amplify';
import { Outlet } from 'react-router-dom';

import awsExports from './aws-exports';

import { AppContainer, OutletContainer } from 'App.styled';
import { Footer, Header, SidebarWrapper } from 'components/organisms';

Amplify.configure(awsExports);

export const App = () => {
  return (
    <AppContainer>
      <Header />
      <OutletContainer>
        <SidebarWrapper />
        <Outlet />
      </OutletContainer>
      <Footer />
    </AppContainer>
  );
};
