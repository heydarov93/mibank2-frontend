import { useTranslation } from 'react-i18next';

import { StyledContainer } from './PasswordValidationTags.styled';

import { ValidationTag } from 'components/atoms';
import { EValidationKey } from 'enums';
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
          isValidated={passwordValidationRules[key as EValidationKey](password)}
          withInfo={key === EValidationKey.SPECIAL_CHAR}
        />
      ))}
    </StyledContainer>
  );
}
