import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledFlexColumn,
  StyledLogoContainer,
  StyledSecondaryText,
  StyledTitle,
} from './BackOfficeErrorLayout.styled';

import { Logo, ReloadButton } from 'components/atoms';

export const BackOfficeErrorLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BackOffice.ErrorPage',
  });

  return (
    <StyledContainer>
      <StyledLogoContainer>
        <Logo color="white"/>
      </StyledLogoContainer>
      <StyledFlexColumn>
        <StyledTitle>{t('serviceUnavailable')}</StyledTitle>
        <StyledSecondaryText>{t('refresh')}</StyledSecondaryText>
        <ReloadButton sx={{ color: 'white' }} data-testid="reload-button"/>
      </StyledFlexColumn>
    </StyledContainer>
  );
};
