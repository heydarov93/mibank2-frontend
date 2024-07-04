import { AuthWrapper, Footer, VerificationForm } from 'components/organisms';

export const VerificationPage = () => {
  return (
    <>
      <AuthWrapper
        notificationPosition={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <VerificationForm />
      </AuthWrapper>
      <Footer />
    </>
  );
};
