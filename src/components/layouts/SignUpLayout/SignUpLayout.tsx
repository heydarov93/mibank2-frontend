import { UserAuthWrapper, Footer, SignupWithEmail } from 'components/organisms';

export const SignUpLayout = () => {
  return (
    <>
      <UserAuthWrapper>
        <SignupWithEmail />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
