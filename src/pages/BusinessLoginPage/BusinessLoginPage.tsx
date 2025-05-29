import { StyledContainer } from './BussinessLoginPage.styled';

import {
  AddressRegisterForm,
  Footer,
  LeftLogoSidebar,
} from 'components/organisms';

const BusinessLoginPage = () => {
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

export default BusinessLoginPage;
