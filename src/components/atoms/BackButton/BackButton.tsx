import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { StyledButton } from './BackButton.styled';

import { ReactComponent as BackArrowSVG } from 'assets/icons/BackArrow.svg';

export const BackButton = memo(() => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <StyledButton onClick={handleClick} aria-label={t('label.goBack')}>
      <BackArrowSVG aria-hidden="true" focusable="false" />
    </StyledButton>
  );
});

BackButton.displayName = 'BackButton';
