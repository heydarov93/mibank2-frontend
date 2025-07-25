import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormLabel, MainContainer, MainHeader } from './CardEditForm.styled';

import { CloseButton, InputField } from 'components/atoms';
import { CustomAutocomplete } from 'components/molecules';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import { TableData } from 'models/ITableData';
import { editCardSchema, TEditCardValues } from 'validation';

interface CardEditFormProps {
  handleClose: () => void;
  formData?: Partial<TableData>;
}

export const CardEditForm = ({ handleClose, formData }: CardEditFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TEditCardValues>({
    resolver: yupResolver(editCardSchema),
    mode: 'all',
    defaultValues: {
      cardName: formData?.productName,
      cardDescription: formData?.cardDescription,
      cardCurrency: formData?.cardCurrency,
      cardCashbackRate: formData?.cardCashbackRate,
      monthlyFee: formData?.monthlyFee,
      dailyOperationalLimit: formData?.dailyOperationalLimit,
      foreignTransactionLimit: formData?.foreignTransactionLimit,
    },
  });

  const onSubmit = () => {
    handleClose();
  };

  return (
    <MainContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MainHeader>{t('cardEditForm.editCard')}</MainHeader>
        <CloseButton onClick={handleClose} />
      </Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <Box sx={{ width: '100%' }} data-testid="cardName">
          <FormLabel>{t('cardEditForm.cardName')}</FormLabel>
          <InputField
            name="cardName"
            id="productName"
            control={control}
            placeholder={t('cardEditForm.cardName')}
            error={errors.cardName}
            helperText={errors.cardName?.message}
          />
        </Box>

        <Box>
          <FormLabel>{t('cardEditForm.cardDescription')}</FormLabel>
          <InputField
            name="cardDescription"
            id="cardDescription"
            control={control}
            placeholder={t('cardEditForm.cardDescription')}
            error={errors.cardDescription}
            helperText={errors.cardDescription?.message}
            multiline
            rows={4}
          />
        </Box>

        <Box>
          <FormLabel>{t('cardEditForm.cardCurrency')}</FormLabel>
          <Controller
            name="cardCurrency"
            control={control}
            render={({ field }) => (
              <CustomAutocomplete
                options={[...SUPPORTED_CURRENCIES]}
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                error={!!errors.cardCurrency}
                helperText={errors.cardCurrency?.message}
              />
            )}
          />
        </Box>

        <Box>
          <FormLabel>{t('cardEditForm.cashbackRate')}</FormLabel>
          <InputField
            name="cardCashbackRate"
            id="cashbackRate"
            control={control}
            placeholder={t('cardEditForm.cashbackRate')}
            error={errors.cardCashbackRate}
            helperText={errors.cardCashbackRate?.message}
          />
        </Box>

        <Box>
          <FormLabel>{t('cardEditForm.monthlyFee')}</FormLabel>
          <InputField
            name="monthlyFee"
            id="monthlyFee"
            control={control}
            placeholder={t('cardEditForm.monthlyFee')}
            error={errors.monthlyFee}
            helperText={errors.monthlyFee?.message}
          />
        </Box>

        <Box>
          <FormLabel>{t('cardEditForm.dailyOperationalLimit')}</FormLabel>
          <InputField
            name="dailyOperationalLimit"
            id="dailyOperationalLimit"
            control={control}
            placeholder={t('cardEditForm.dailyOperationalLimit')}
            error={errors.dailyOperationalLimit}
            helperText={errors.dailyOperationalLimit?.message}
          />
        </Box>

        <Box>
          <FormLabel>{t('cardEditForm.foreignTransactionLimit')}</FormLabel>
          <InputField
            name="foreignTransactionLimit"
            id="foreignTransactionLimit"
            control={control}
            placeholder={t('cardEditForm.foreignTransactionLimit')}
            error={errors.foreignTransactionLimit}
            helperText={errors.foreignTransactionLimit?.message}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '24px',
            height: '56px',
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            {t('cardEditForm.cancel')}
          </Button>
          <Button
            data-testid="submitBtn"
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            {t('cardEditForm.saveChanges')}
          </Button>
        </Box>
      </form>
    </MainContainer>
  );
};
