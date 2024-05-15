import { LoginPageWrapper } from './LoginPage.styled';

import { Footer } from 'components/organisms/Footer';
import { LoginForm } from 'components/organisms/LoginForm/LoginForm';

export const LoginPage = () => {
  return (
    <>
      <LoginPageWrapper>
        <LoginForm />
      </LoginPageWrapper>
      <Footer />
    </>
  );
};
