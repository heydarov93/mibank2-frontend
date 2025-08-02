import InputAdornment from '@mui/material/InputAdornment';

import { ISavedCardAccount } from '../../hooks/useTransferAccounts';

import { CardIssuerIcon, WalletIcon } from 'components/atoms';
import { IUserCardAccountOption } from 'models/IAccount';

interface CardFieldAdornmentProps {
  options: IUserCardAccountOption[] | ISavedCardAccount[];
  selectedValue: string;
}

export function CardFieldAdornment({
  options,
  selectedValue,
}: CardFieldAdornmentProps) {
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
