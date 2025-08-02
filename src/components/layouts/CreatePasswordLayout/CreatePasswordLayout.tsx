import { UserAuthWrapper, Footer, SignupWithPassword } from 'components/organisms';

export const CreatePasswordLayout = () => {
  return (
    <>
      <UserAuthWrapper>
        <SignupWithPassword />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
