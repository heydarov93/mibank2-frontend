import { useTranslation } from 'react-i18next';

import {
  StyledHeader,
  StyledSubTitle,
  StyledTitle,
} from '../DepositCreationForm.styled';

const FormHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <>
      <StyledHeader>
        <StyledTitle>{t('openDeposit')}</StyledTitle>
      </StyledHeader>
      <StyledSubTitle>{t('openDepositFormSubTitle')}</StyledSubTitle>
    </>
  );
};

export default FormHeader;
