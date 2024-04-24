import { StyledFooterWrapper } from './Footer.styled';
import { FooterContacts } from './FooterContacts';
import { FooterTerms } from './FooterTerms';

export const Footer = () => {
  return (
    <StyledFooterWrapper>
      <FooterContacts />
      <FooterTerms />
    </StyledFooterWrapper>
  );
};
