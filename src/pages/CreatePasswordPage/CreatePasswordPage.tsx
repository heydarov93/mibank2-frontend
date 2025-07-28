import { UserAuthWrapper, Footer, SignupWithPassword } from 'components/organisms';

export const CreatePasswordPage = () => {
  return (
    <>
      <UserAuthWrapper>
        <SignupWithPassword />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
