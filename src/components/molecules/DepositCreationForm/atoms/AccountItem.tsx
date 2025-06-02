import { MenuItem } from '@mui/material';
import { HTMLAttributes } from 'react';

import { StyledOption, StyledOptionText } from '../DepositCreationForm.styled';

import { AccountOption } from 'models/IDepositInfo';

interface AccountItemProps {
  selected: boolean;
  option: AccountOption;
  props: HTMLAttributes<HTMLLIElement>;
}

const AccountItem = ({ props, selected, option }: AccountItemProps) => {
  return (
    <MenuItem
      {...props}
      style={{
        padding: '10px 16px',
      }}
    >
      <StyledOption>
        <StyledOptionText
          sx={({ palette }) => ({
            color: selected ? palette.primary.main : palette.common.black,
          })}
        >
          {option.iban}
        </StyledOptionText>
        <StyledOptionText
          sx={({ palette }) => ({
            color: selected ? palette.primary.main : palette.grey[400],
          })}
        >
          {option.currency} {option.balance}
        </StyledOptionText>
      </StyledOption>
    </MenuItem>
  );
};

export default AccountItem;
