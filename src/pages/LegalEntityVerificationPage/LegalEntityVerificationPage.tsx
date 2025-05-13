import {
  StyledContentWrapper,
  StyledPageLayout,
} from './LegalEntityVerificationPage.styled';

import { BackButton } from 'components/atoms';
import { Footer, LegalEntityVerificationContent } from 'components/organisms';

export const LegalEntityVerificationPage = () => {
  return (
    <StyledPageLayout>
      <BackButton />
      <StyledContentWrapper>
        <LegalEntityVerificationContent />
      </StyledContentWrapper>
      <Footer />
    </StyledPageLayout>
  );
};
