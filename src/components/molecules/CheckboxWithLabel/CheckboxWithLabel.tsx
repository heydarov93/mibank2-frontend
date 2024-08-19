import { Checkbox, Link, useTheme } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  AgreementContainer,
  CheckboxStyledContainer,
} from './CheckboxWithLabel.styled';

import { termsLink, policyLink } from 'components/organisms/Footer/constants';
import { ILoginFormInput } from 'models/IAuth';
import { generateRandomParam } from 'utils';

interface CheckboxWithLabelProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  errors: FieldErrors<ILoginFormInput>;
  isFormDisabled: boolean;
}

export const CheckboxWithLabel = <T extends FieldValues>({
  control,
  errors,
  name,
  isFormDisabled,
}: CheckboxWithLabelProps<T>) => {
  const { t } = useTranslation('translation');
  const theme = useTheme();

  const urlTerms = `${termsLink}${generateRandomParam()}`;
  const urlPolicy = `${policyLink}${generateRandomParam()}`;

  return (
    <CheckboxStyledContainer className={errors.checkbox ? 'shake' : ''}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              disableRipple
              defaultChecked
              size="small"
              sx={{
                color: errors.checkbox
                  ? theme.palette.error.main
                  : theme.palette.grey[300],
                padding: '12px 8px 12px 0px',
                '&.Mui-checked': {
                  color: 'primary',
                },
                '&.Mui-disabled': {
                  color: theme.palette.grey[300],
                },
              }}
              disabled={isFormDisabled}
              {...field}
            />
          );
        }}
      />

      <AgreementContainer
        variant="body2"
        disabled={isFormDisabled}
        hasError={Boolean(errors.checkbox)}
      >
        {`${t('LoginPage.termsText')} `}

        <>
          <Link
            href={urlTerms}
            target="_blank"
            color="inherit"
            variant="body2"
            fontWeight={500}
          >
            {t('footer.footerBottom.terms')}
          </Link>

          {` ${t('footer.footerBottom.and')} `}

          <Link
            href={urlPolicy}
            target="_blank"
            color="inherit"
            variant="body2"
            fontWeight={500}
          >
            {t('footer.footerBottom.policy')}
          </Link>
        </>
      </AgreementContainer>
    </CheckboxStyledContainer>
  );
};
