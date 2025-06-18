import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SxProps } from '@mui/material';

import { StyledContainer } from './ValidationTag.styled';

import { SpecialCharactersTooltip } from 'components/atoms';

type ValidationTagProps = {
  text: string;
  isValidated?: boolean;
  withInfo?: boolean;
};

export function ValidationTag({
  text,
  isValidated = false,
  withInfo = false,
}: ValidationTagProps) {
  const iconSx: SxProps = { width: '14px', height: '14px' };
  const statusIcon = isValidated ? (
    <CheckIcon sx={iconSx} data-testid="success-icon" />
  ) : (
    <ClearIcon sx={iconSx} data-testid="error-icon" />
  );
  const infoIcon = withInfo && (
    <SpecialCharactersTooltip>
      <InfoOutlinedIcon sx={iconSx} data-testid="info-icon" />
    </SpecialCharactersTooltip>
  );

  return (
    <StyledContainer
      sx={(theme) => ({
        backgroundColor: isValidated
          ? theme.palette.primary.light
          : theme.palette.error.light,
      })}
    >
      {statusIcon} {text} {infoIcon}
    </StyledContainer>
  );
}
