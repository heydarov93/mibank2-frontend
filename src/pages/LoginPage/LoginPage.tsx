import { LoginPageWrapper } from './LoginPage.styled';

import { Footer, LoginForm } from 'components/organisms';

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
