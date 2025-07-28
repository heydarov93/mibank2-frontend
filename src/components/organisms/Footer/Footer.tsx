import { StyledFooterWrapper } from './Footer.styled';
import { FooterContacts, FooterTerms } from './molecules';

export const Footer = () => {
  return (
    <StyledFooterWrapper>
      <FooterContacts />
      <FooterTerms />
    </StyledFooterWrapper>
  );
};
