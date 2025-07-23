import { Stack, SxProps, Theme } from '@mui/material';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton, StyledTypography } from './Address.styled';

interface AddressProps {
  country: string;
  street: string;
  postCode: string;
  sx?: SxProps<Theme>;
  onEdit?: () => void;
}

export const Address = memo<AddressProps>(
  ({ country, street, postCode, sx, onEdit }: AddressProps) => {
    const { t } = useTranslation('translation');
    const addressLabel = useMemo(
      () => `${street}, ${postCode}, ${country}`,
      [street, postCode, country],
    );

    return (
      <Stack
        component="address"
        role="group"
        aria-label={addressLabel}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={1}
        sx={sx}
      >
        <Stack>
          <StyledTypography>{country}</StyledTypography>
          <StyledTypography>{street}</StyledTypography>
          <StyledTypography>{postCode}</StyledTypography>
        </Stack>
        {onEdit && (
          <StyledButton
            onClick={onEdit}
            data-testid="edit-address-button"
            aria-label={t('Accessibility.label.edit')}
          >
            {t('Address.edit')}
          </StyledButton>
        )}
      </Stack>
    );
  },
);

Address.displayName = 'Address';
