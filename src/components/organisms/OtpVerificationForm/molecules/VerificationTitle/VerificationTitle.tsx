import { useTranslation } from 'react-i18next';

import {
  StyledVerificationBoxTitle,
  StyledVerificationSubTitle,
  StyledVerificationTitle,
} from './VerificationTitle.styled';

export const VerificationTitle = ({ email }: { email: string | null }) => {
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
