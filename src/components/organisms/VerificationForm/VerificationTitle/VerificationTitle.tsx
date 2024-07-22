import { useTranslation } from 'react-i18next';

import {
  StyledVerificationBoxTitle,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationTitle.styled';

interface VerificationTitleProprs {
  email: string | null;
}

export const VerificationTitle = ({ email }: VerificationTitleProprs) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <StyledVerificationBoxTitle>
        <StyledVerificationTitle>
          {t('VerificationPage.verificationTitle')}
        </StyledVerificationTitle>
        <StyledVerificationSubTitle>
          {t('VerificationPage.verificationText')} <span>{email}</span>
        </StyledVerificationSubTitle>
      </StyledVerificationBoxTitle>
    </>
  );
};
