import { Box } from '@mui/material';

import { StyledOptionContainer } from '../TransferForm.styled';
import { ETransferMethod } from '../enums/ETransferMethod';
import { SavedAccount } from '../interfaces/SavedAccount';

import { MastercardIcon } from 'components/atoms/MastercardIcon/MastercardIcon';
import { VisaIcon } from 'components/atoms/VisaIcon/VisaIcon';

interface OptionRenderProps {
  option: SavedAccount;
  transferMethod: ETransferMethod;
}

export function OptionRender({ option, transferMethod }: OptionRenderProps) {
  return (
    <StyledOptionContainer>
      <Box display="flex" gap={1}>
        {transferMethod !== ETransferMethod.IBAN &&
          (option.issuer === 'visa' ? <VisaIcon /> : <MastercardIcon />)}
        <span>{option.number}</span>
      </Box>
      <span>{option.label}</span>
    </StyledOptionContainer>
  );
}
