import { Box, Stack } from '@mui/material';
import { HTMLAttributes } from 'react';

import {
  IUserCardAccountOption,
  IUserIBANAccountOption,
} from '../../../../models/IUserAccountOption';
import {
  ISavedCardAccount,
  ISavedIBANAccount,
} from '../hooks/useTransferAccounts';

import { CardIssuerIcon } from 'components/atoms';
import { CARD_PATTERN, IBAN_PATTERN } from 'constants/validation/patterns';
import { formatWithPattern } from 'utils/formatters/textFormatter';

export function renderOption(
  props: HTMLAttributes<HTMLLIElement>,
  option:
    | (ISavedIBANAccount | ISavedCardAccount)
    | (IUserIBANAccountOption | IUserCardAccountOption),
) {
  const pattern = option.type === 'iban' ? IBAN_PATTERN : CARD_PATTERN;
  const accountNumber = formatWithPattern(option.number, pattern);
  const cardIcon = option.type === 'card' && (
    <CardIssuerIcon issuer={option.issuer} />
  );

  return (
    <li {...props}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box display="flex" gap={1}>
          {cardIcon}
          <span style={{ whiteSpace: 'nowrap' }}>{accountNumber}</span>
        </Box>
        <span style={{ whiteSpace: 'nowrap' }}>{option.label}</span>
      </Stack>
    </li>
  );
}
