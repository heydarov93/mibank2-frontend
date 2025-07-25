import { UserAuthWrapper, Footer, SignupWithEmail } from 'components/organisms';

export const SignUpPage = () => {
  return (
    <>
      <UserAuthWrapper>
        <SignupWithEmail />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
