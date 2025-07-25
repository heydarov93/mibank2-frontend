import { InputAdornment } from '@mui/material';

import { ISavedCardAccount } from '../../hooks/useAccounts';

import { CardIssuerIcon, WalletIcon } from 'components/atoms';
import { IUserCardAccountOption } from 'models/IUserAccountOption';

export function CardFieldAdornment({
  options,
  selectedValue,
}: {
  options: IUserCardAccountOption[] | ISavedCardAccount[];
  selectedValue: string;
}) {
  const selectedOption = options.find(
    (option) => option.number === selectedValue,
  );
  return (
    <InputAdornment position="start">
      {selectedOption?.issuer ? (
        <CardIssuerIcon issuer={selectedOption.issuer} />
      ) : (
        <WalletIcon />
      )}
    </InputAdornment>
  );
}
