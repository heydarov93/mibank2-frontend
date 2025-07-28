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
      <StyledContentWrapper data-testid="content-wrapper">
        <LegalEntityVerificationContent />
      </StyledContentWrapper>
      <Footer />
    </StyledPageLayout>
  );
};
