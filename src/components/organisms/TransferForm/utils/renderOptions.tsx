import { Box, Stack } from '@mui/material';
import { HTMLAttributes } from 'react';

import { ISavedCardAccount, ISavedIBANAccount } from '../hooks/useAccounts';
import {
  IUserCardAccountOption,
  IUserIBANAccountOption,
} from '../interfaces/IUserAccountOption';

import { CardIssuerIcon } from 'components/atoms';
import { CARD_PATTERN, IBAN_PATTERN } from 'constants/inputPatterns';

function formatWithPattern(
  input: string,
  pattern: typeof IBAN_PATTERN | typeof CARD_PATTERN,
) {
  const digits = input.replace(/\D/g, '').split('');
  let i = 0;
  return pattern.replace(/#/g, () => digits[i++] ?? '');
}

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
          <span>{accountNumber}</span>
        </Box>
        <span style={{ whiteSpace: 'nowrap' }}>{option.label}</span>
      </Stack>
    </li>
  );
}
