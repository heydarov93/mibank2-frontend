import { Checkbox, Link, useTheme } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AgreementContainer, StyledContainer } from './TOSCheckbox.styled';

import { termsLink, policyLink } from 'components/organisms/Footer/constants';
import { ILoginFormInput } from 'models/IAuth';
import { generateRandomParam } from 'utils/helpers';

interface TOSCheckboxProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  errors: FieldErrors<ILoginFormInput>;
  isFormDisabled?: boolean;
}

export const TOSCheckbox = <T extends FieldValues>({
  control,
  errors,
  name,
  isFormDisabled,
}: TOSCheckboxProps<T>) => {
  const { t } = useTranslation('translation');
  const theme = useTheme();

  const urlTerms = `${termsLink}${generateRandomParam()}`;
  const urlPolicy = `${policyLink}${generateRandomParam()}`;

  return (
    <StyledContainer className={errors.checkbox ? 'shake' : ''}>
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
                padding: 0,
                '&.Mui-checked': {
                  color: 'primary',
                },
                '&.Mui-disabled': {
                  color: theme.palette.grey[300],
                },
                '&.Mui-SvgIcon-root': {
                  transformOrigin: 'center top',
                  transform: 'scale(1.3)',
                  width: '16px',
                  height: '16px',
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
        disabled={!!isFormDisabled}
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
    </StyledContainer>
  );
};
