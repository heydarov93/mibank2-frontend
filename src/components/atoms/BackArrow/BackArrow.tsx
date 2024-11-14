import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useTranslation } from 'react-i18next';

import { StyledBackArrow } from './BackArrow.styled';

export const BackArrow = ({ onBackClick }: { onBackClick?: () => void }) => {
  const { t } = useTranslation('translation');

  return (
    <StyledBackArrow onClick={onBackClick}>
      <KeyboardArrowLeftIcon />
      {t('RegistrationPage.buttonBackArrow')}
    </StyledBackArrow>
  );
};
