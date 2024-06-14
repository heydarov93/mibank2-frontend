import { Amplify } from 'aws-amplify';
import { Outlet } from 'react-router-dom';

import awsExports from './aws-exports';
import { Header } from './components/organisms/Header';

import { Footer } from 'components/organisms/Footer';

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
