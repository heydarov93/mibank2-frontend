import { InputAdornment } from '@mui/material';

import { ISavedCardAccount } from '../hooks/useAccounts';
import { IUserCardAccountOption } from '../interfaces/IUserAccountOption';

import { CardIssuerIcon } from 'components/atoms';
import WalletIcon from 'components/atoms/WalletIcon/WalletIcon';

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
