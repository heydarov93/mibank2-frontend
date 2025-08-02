import { ErrorNotification } from 'components/molecules';
import { BusinessAuthWrapper, BusinessSignUpForm } from 'components/organisms';

export const BusinessSignUpLayout = () => {
  return (
    <BusinessAuthWrapper>
      <ErrorNotification />
      <BusinessSignUpForm />
    </BusinessAuthWrapper>
  );
};
