import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Address } from 'components/atoms';
import { SwitchWithLabel } from 'components/atoms/SwitchWithLabel/SwitchWithLabel';
import { OpenBusinessAccFormValues } from 'hooks/useOpenBusinessAccFlow';

export interface OpenBusinessAccountAddressProps {
  onEdit: () => void;
  sx?: SxProps<Theme>;
}

export const OpenBusinessAccountAddress = ({
  sx,
  onEdit,
}: OpenBusinessAccountAddressProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal',
  });
  const { setValue, watch } = useFormContext<OpenBusinessAccFormValues>();
  const isConfirmed = watch('addressConfirmed');

  function handleSwitchChange() {
    setValue('addressConfirmed', !isConfirmed, { shouldValidate: true });
  }

  return (
    <Stack sx={sx} data-testid="open-business-acc-address">
      <Typography fontSize={24} fontWeight={600}>
        {t('deliveryAddress')}:
      </Typography>
      <Address
        country="Poland"
        street="Ul. Kargowaska 12/203"
        postCode="66-110 Babimost"
        onEdit={onEdit}
        sx={{ mt: 2, mb: 3 }}
      />
      <SwitchWithLabel
        label={t('addressConfirmation')}
        checked={isConfirmed}
        onChange={handleSwitchChange}
        data-testid="switch-address-confirmation"
      />
    </Stack>
  );
};
