import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledFlexColumn,
  StyledLogoContainer,
  StyledSecondaryText,
  StyledTitle,
} from './BackOfficeErrorPage.styled';

import { Logo } from 'components/atoms';
import ReloadButton from 'components/atoms/ReloadButton/ReloadButton';

export const BackOfficeErrorPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BackOffice.ErrorPage',
  });

  return (
    <StyledContainer>
      <StyledLogoContainer>
        <Logo color="white" />
      </StyledLogoContainer>
      <StyledFlexColumn>
        <StyledTitle>{t('serviceUnavailable')}</StyledTitle>
        <StyledSecondaryText>{t('refresh')}</StyledSecondaryText>
        <ReloadButton sx={{ color: 'white' }} />
      </StyledFlexColumn>
    </StyledContainer>
  );
};
