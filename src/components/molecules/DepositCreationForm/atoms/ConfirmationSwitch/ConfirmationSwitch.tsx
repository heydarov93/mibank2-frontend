import { Switch } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledTermsRow,
  StyledTermsText,
} from '../../DepositCreationForm.styled';

import { DepositFormValues } from 'models/IDepositInfo';

interface ConfirmationSwitchProps {
  control: Control<DepositFormValues>;
}

const ConfirmationSwitch = ({ control }: ConfirmationSwitchProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <Controller
      name="checkbox"
      control={control}
      render={({ field }) => (
        <StyledTermsRow
          control={
            <Switch
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              size="medium"
            />
          }
          label={<StyledTermsText>{t('confirmationText')}</StyledTermsText>}
        />
      )}
    />
  );
};

export default ConfirmationSwitch;
