import {
  StyledContentWrapper,
  StyledPageLayout,
} from './LegalEntityVerificationLayout.styled';

import { BackButton } from 'components/atoms';
import { Footer, LegalEntityVerificationContent } from 'components/organisms';

export const LegalEntityVerificationLayout = () => {
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
