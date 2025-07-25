import { StyledContainer } from './BusinessLoginLayout.styled';

import {
  AddressRegisterForm,
  Footer,
  LeftLogoSidebar,
} from 'components/organisms';

export const BusinessLoginLayout = () => {
  return (
    <>
      <StyledContainer>
        <LeftLogoSidebar />
        <AddressRegisterForm />
      </StyledContainer>
      <Footer />
    </>
  );
};
