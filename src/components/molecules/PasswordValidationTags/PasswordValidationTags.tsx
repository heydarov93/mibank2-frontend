import { useTranslation } from 'react-i18next';

import { StyledContainer } from './PasswordValidationTags.styled';

import { ValidationTag } from 'components/atoms';
import { ValidationKey } from 'enums';
import { passwordValidationRules } from 'validation';

export function PasswordValidationTags({ password }: { password: string }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.field.password.requirement',
  });
  return (
    <StyledContainer>
      {Object.keys(passwordValidationRules).map((key) => (
        <ValidationTag
          key={key}
          text={t(key)}
          isValidated={passwordValidationRules[key as ValidationKey](password)}
          withInfo={key === ValidationKey.SPECIAL_CHAR}
        />
      ))}
    </StyledContainer>
  );
}
