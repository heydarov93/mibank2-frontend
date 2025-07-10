import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledPageWrapper,
  StyledBox,
  StyledTitleContainer,
  StyledTitle,
  StyledDescription,
  StyledButton,
} from './UnderDevPage.styled';

import { ReactComponent as UnderDevelopmentImage } from 'assets/icons/Under_development.svg';

export const UnderDevPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'UnderDevPage',
  });
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <StyledPageWrapper>
      <StyledBox>
        <UnderDevelopmentImage />
        <StyledTitleContainer>
          <StyledTitle variant="h5">{t('title')}</StyledTitle>
          <StyledDescription variant="body2">
            {t('description')}
          </StyledDescription>
        </StyledTitleContainer>
        <StyledButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleBackClick}
        >
          {t('buttonLabel')}
        </StyledButton>
      </StyledBox>
    </StyledPageWrapper>
  );
};
