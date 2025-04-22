import { Amplify } from 'aws-amplify';
import { Outlet } from 'react-router-dom';

import awsExports from './aws-exports';

import { AppContainer } from 'App.styled';
import { Footer, Header } from 'components/organisms';

Amplify.configure(awsExports);

export const App = () => {
  return (
    <AppContainer>
      <Header />
      <Outlet />
      <Footer />
    </AppContainer>
  );
};
