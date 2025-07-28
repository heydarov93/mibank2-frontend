import { useTranslation } from 'react-i18next';

import { StyledContainer } from './PasswordValidationTags.styled';

import { ValidationTag } from 'components/atoms';
import { PASSWORD_VALIDATION_RULES } from 'constants/validation/patterns';
import { EValidationKey } from 'enums';

export function PasswordValidationTags({ password }: { password: string }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.field.password.requirement',
  });
  return (
    <StyledContainer>
      {Object.keys(PASSWORD_VALIDATION_RULES).map((key) => (
        <ValidationTag
          key={key}
          text={t(key)}
          isValidated={PASSWORD_VALIDATION_RULES[key as EValidationKey](
            password,
          )}
          withInfo={key === EValidationKey.SPECIAL_CHAR}
        />
      ))}
    </StyledContainer>
  );
}
