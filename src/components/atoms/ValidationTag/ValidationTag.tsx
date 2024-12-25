import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import {
  StyledValidationTagContainer,
  StyledValidationTag,
} from './ValidationTag.styled';

type ValidationTagProps = {
  tagText: string;
  isValidated: boolean;
  isSpecial?: boolean;
};

export const ValidationTag = ({
  tagText,
  isValidated,
  isSpecial,
}: ValidationTagProps) => {
  return (
    <StyledValidationTagContainer direction="row">
      <StyledValidationTag
        label={tagText}
        isValidated={isValidated}
        icon={isValidated ? <CheckIcon /> : <ClearIcon />}
        isSpecial={isSpecial ?? false}
        data-testid="InfoOutlinedIcon"
      />
    </StyledValidationTagContainer>
  );
};
