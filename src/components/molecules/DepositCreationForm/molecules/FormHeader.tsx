import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';

import {
  StyledHeader,
  StyledSubTitle,
  StyledTitle,
} from '../DepositCreationForm.styled';

interface FormHeader {
  onBack: () => void;
}

const FormHeader = ({ onBack }: FormHeader) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <>
      <StyledHeader>
        <ArrowBackIosIcon
          onClick={onBack}
          sx={({ palette }) => ({
            width: '24px',
            height: '24px',
            color: palette.grey[400],
            cursor: 'pointer',
          })}
        />
        <StyledTitle>{t('openDeposit')}</StyledTitle>
      </StyledHeader>
      <StyledSubTitle>{t('openDepositFormSubTitle')}</StyledSubTitle>
    </>
  );
};

export default FormHeader;
