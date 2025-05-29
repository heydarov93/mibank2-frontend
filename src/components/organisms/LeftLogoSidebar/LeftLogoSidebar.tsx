import { useTranslation } from 'react-i18next';

import {
  StyledLogoContainer,
  StyledLogoText,
  StyledSidebar,
} from './LeftLogoSidebar.styled';

import { MiBlueLogoIcon } from 'components/atoms';

export const LeftLogoSidebar = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BusinessLoginPage',
  });

  return (
    <StyledSidebar>
      <StyledLogoContainer>
        <MiBlueLogoIcon />
        <StyledLogoText>{t('logoTitle')}</StyledLogoText>
      </StyledLogoContainer>
    </StyledSidebar>
  );
};
