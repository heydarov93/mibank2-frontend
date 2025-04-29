import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  StyledArrowIcon,
  StyledButtonsContainer,
  StyledForm,
  StyledLabel,
} from './TransferForm.styled';
import { OptionRender } from './atoms/OptionRender';
import { ETransferMethod } from './enums/ETransferMethod';
import { useTransferMethod } from './hooks/useTransferMethod';
import { InputField } from './molecules/InputField';
import { MoneyInput } from './molecules/MoneyInput';

import { CurrencySelect } from 'components/organisms/TransferForm/atoms/CurrencySelect';
import { AutocompleteField } from 'components/organisms/TransferForm/molecules/AutocompleteField';
import { schema } from 'validation/transferFormSchema';

export function TransferForm({
  transferMethod,
}: {
  transferMethod: ETransferMethod;
}) {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<{
    fromAccount: string;
    toAccount: string;
    amount: string;
    currency: string;
    message?: string;
  }>({
    resolver: yupResolver(schema(transferMethod)),
    mode: 'all',
  });

  const { labels, inputPattern, savedSources, savedTargets } =
    useTransferMethod(transferMethod);

  return (
    <StyledForm>
      <Box sx={{ gridColumn: 1, gridRow: 1 }}>
        <StyledLabel htmlFor="fromAccount">{labels.fromFieldLabel}</StyledLabel>
        <AutocompleteField
          name="fromAccount"
          control={control}
          options={savedSources}
          format={inputPattern}
          error={errors.fromAccount}
          renderOption={(props, option) => (
            <li {...props}>
              <OptionRender option={option} transferMethod={transferMethod} />
            </li>
          )}
          textFieldProps={{
            placeholder: labels.fromFieldPlaceholder,
          }}
        />
      </Box>
      <Box sx={{ gridColumn: 1, gridRow: 2 }}>
        <StyledLabel htmlFor="amount">{labels.amountFieldLabel}</StyledLabel>
        <InputField
          name="amount"
          control={control}
          inputComponent={MoneyInput as never}
          error={errors.amount}
          textFieldProps={{
            placeholder: labels.amountFieldPlaceholder,
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <CurrencySelect name="currency" control={control} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ gridColumn: 1, gridRow: 3 }}>
        <StyledLabel htmlFor="message">{labels.messageFieldLabel}</StyledLabel>
        <InputField
          name="message"
          control={control}
          error={errors.message}
          textFieldProps={{
            placeholder: labels.messageFieldPlaceholder,
          }}
        />
      </Box>

      <StyledArrowIcon color="disabled">
        <ArrowForwardIcon />
      </StyledArrowIcon>

      <Box sx={{ gridColumn: 2, gridRow: 1 }}>
        <StyledLabel htmlFor="toAccount">{labels.toFieldLabel}</StyledLabel>
        <AutocompleteField
          name="toAccount"
          control={control}
          options={savedTargets}
          format={inputPattern}
          error={errors.toAccount}
          renderOption={(props, option) => (
            <li {...props}>
              <OptionRender option={option} transferMethod={transferMethod} />
            </li>
          )}
          textFieldProps={{
            placeholder: labels.toFieldPlaceholder,
          }}
        />
      </Box>

      <StyledButtonsContainer sx={{ gridColumn: 1, gridRow: 4 }}>
        <Button variant="outlined" size="large" sx={{ borderRadius: '8px' }}>
          {labels.cancel}
        </Button>
        <Button
          disabled={!isValid}
          sx={{ borderRadius: '8px' }}
          type="submit"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
        >
          {labels.submit}
        </Button>
      </StyledButtonsContainer>
    </StyledForm>
  );
}
