import { MenuItem } from '@mui/material';
import { HTMLAttributes, memo } from 'react';

import {
  StyledOption,
  StyledOptionText,
} from '../../DepositCreationForm.styled';

import { AccountOption } from 'models/IDepositInfo';

interface AccountItemProps {
  selected: boolean;
  option: AccountOption;
  props: HTMLAttributes<HTMLLIElement>;
}

export const AccountItem = memo<AccountItemProps>(
  ({
    props,
    selected,
    option: { iban, currency, balance },
  }: AccountItemProps) => {
    return (
      <MenuItem
        style={{
          padding: '10px 16px',
        }}
        role="option"
        aria-selected={selected}
        selected={selected}
        {...props}
      >
        <StyledOption>
          <StyledOptionText
            sx={({ palette }) => ({
              color: selected ? palette.primary.main : palette.common.black,
            })}
          >
            {iban}
          </StyledOptionText>
          <StyledOptionText
            sx={({ palette }) => ({
              color: selected ? palette.primary.main : palette.grey[400],
            })}
          >
            {currency} {balance}
          </StyledOptionText>
        </StyledOption>
      </MenuItem>
    );
  },
);

AccountItem.displayName = 'AccountItem';
