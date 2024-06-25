import { Amplify } from 'aws-amplify';
import { Outlet } from 'react-router-dom';

import awsExports from './aws-exports';

import { Footer, Header } from 'components/organisms';

Amplify.configure(awsExports);

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
