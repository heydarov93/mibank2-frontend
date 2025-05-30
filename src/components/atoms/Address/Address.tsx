import { Stack, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledButton, StyledTypography } from './Address.styled';

interface AddressProps {
  country: string;
  street: string;
  postCode: string;
  sx?: SxProps<Theme>;
  onEdit?: () => void;
}

export const Address = ({
  country,
  street,
  postCode,
  sx,
  onEdit,
}: AddressProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Address' });

  return (
    <Stack
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
        <StyledButton onClick={onEdit} data-testid="edit-address-button">
          {t('edit')}
        </StyledButton>
      )}
    </Stack>
  );
};
