import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  UnderDevPageWrapper,
  StyledBox,
  StyledTitleContainer,
  StyledTitle,
  StyledDescription,
  StyledButton,
} from './UnderDevPage.styled';

import { ReactComponent as UnderDevelopmentImage } from 'assets/icons/Under_development.svg';

export const UnderDevPage: React.FC = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <UnderDevPageWrapper>
      <StyledBox>
        <UnderDevelopmentImage />
        <StyledTitleContainer>
          <StyledTitle variant="h5" fontWeight="500" textAlign="center">
            {t('UnderDevPage.title')}
          </StyledTitle>

          <StyledDescription variant="body2" textAlign="center">
            {t('UnderDevPage.description')}
          </StyledDescription>
        </StyledTitleContainer>
        <StyledButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={goBackHandler}
        >
          {t('UnderDevPage.buttonLabel')}
        </StyledButton>
      </StyledBox>
    </UnderDevPageWrapper>
  );
};
