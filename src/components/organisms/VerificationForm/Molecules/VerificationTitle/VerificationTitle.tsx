import { useTranslation } from 'react-i18next';

import {
  StyledVerificationBoxTitle,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationTitle.styled';

interface VerificationTitleProprs {
  email: string | null;
}

const VerificationTitle = ({ email }: VerificationTitleProprs) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'VerificationPage',
  });

  return (
    <>
      <StyledVerificationBoxTitle>
        <StyledVerificationTitle>
          {t('verificationTitle')}
        </StyledVerificationTitle>
        <StyledVerificationSubTitle>
          {t('verificationText')} <span>{email}</span>
        </StyledVerificationSubTitle>
      </StyledVerificationBoxTitle>
    </>
  );
};

export default VerificationTitle;
