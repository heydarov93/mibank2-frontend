import { yupResolver } from '@hookform/resolvers/yup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FieldWithLabel, InputField, PostcodeField } from 'components/atoms';
import { SelectField } from 'components/molecules';
import {
  editCorporateAddressSchema,
  TEditCorporateAddressValues,
} from 'validation';

const countries = [{ value: 'Poland' }];
const cities = [{ value: 'Babimost' }, { value: 'Another city' }];

interface EditCorporateAddressFormProps {
  sx?: SxProps<Theme>;
}

const defaultValues: TEditCorporateAddressValues = {
  country: 'Poland',
  city: 'Babimost',
  building: '203',
  office: '12',
  postcode: '66-110',
  street: 'Kargowaska',
};

export const EditCorporateAddressForm = ({
  sx,
}: EditCorporateAddressFormProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal.editAddressForm',
  });
  const {
    control,
    formState: { isValid, isDirty },
  } = useForm<TEditCorporateAddressValues>({
    resolver: yupResolver(editCorporateAddressSchema),
    defaultValues,
    mode: 'all',
  });
  const isSaveButtonDisabled = !isValid || !isDirty;

  return (
    <Stack
      component="form"
      gap={2}
      sx={sx}
      data-testid="edit-corporate-address-form"
    >
      <FieldWithLabel label={t('country')}>
        <SelectField
          control={control}
          name="country"
          disabled
          options={countries}
          data-testid="country-select"
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('city')}>
        <SelectField
          control={control}
          name="city"
          options={cities}
          placeholder={t('placeholders.city')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('street')}>
        <InputField
          control={control}
          name="street"
          id="street"
          placeholder={t('placeholders.street')}
          data-testid="street-field"
        />
      </FieldWithLabel>
      <Stack direction="row" gap={2}>
        <FieldWithLabel label={t('building')} sx={{ flex: 1 }}>
          <InputField
            control={control}
            name="building"
            id="building"
            placeholder={t('placeholders.building')}
          />
        </FieldWithLabel>
        <FieldWithLabel label={t('office')} sx={{ flex: 1 }}>
          <InputField
            control={control}
            name="office"
            id="office"
            placeholder={t('placeholders.office')}
          />
        </FieldWithLabel>
      </Stack>
      <FieldWithLabel label={t('postcode')}>
        <PostcodeField
          control={control}
          name="postcode"
          id="postcode"
          placeholder={t('placeholders.postcode')}
        />
      </FieldWithLabel>

      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={(theme) => ({ color: theme.palette.grey[400] })}
      >
        <InfoOutlinedIcon />
        <Typography fontSize={14} fontWeight={500}>
          {t('alert')}
        </Typography>
      </Stack>

      <Button
        variant="contained"
        sx={{ height: '56px' }}
        disabled={isSaveButtonDisabled}
        data-testid="save-button"
      >
        {t('save')}
      </Button>
    </Stack>
  );
};
