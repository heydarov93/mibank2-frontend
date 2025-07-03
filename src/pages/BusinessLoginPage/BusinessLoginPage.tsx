import { StyledContainer } from './BussinessLoginPage.styled';

import {
  AddressRegisterForm,
  Footer,
  LeftLogoSidebar,
} from 'components/organisms';

export const BusinessLoginPage = () => {
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
