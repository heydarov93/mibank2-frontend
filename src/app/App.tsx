import { Amplify } from 'aws-amplify';

import { AppLayout } from 'components/layouts';
import { awsConfig } from 'config';

Amplify.configure(awsConfig);

export const App = () => {
  return <AppLayout />;
};
