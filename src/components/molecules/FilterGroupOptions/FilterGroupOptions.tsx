import { Box, Checkbox } from '@mui/material';

import {
  StyledFormControlLabel,
  StyledHeaderBox,
  StyledLabel,
} from './FilterGroupOptions.styled';

import { FilterGroupOptionsProps } from 'models/IFilterInfo';

export const FilterGroupOptions: React.FC<FilterGroupOptionsProps> = ({
  group,
  groupIndex,
  onOptionChange,
}: FilterGroupOptionsProps) => {
  return (
    <Box>
      {group.groupTitle && (
        <StyledHeaderBox>
          <StyledLabel>{group.groupTitle}</StyledLabel>
        </StyledHeaderBox>
      )}
      {group.options.map((option) => (
        <StyledFormControlLabel
          key={option.name}
          control={
            <Checkbox
              name={option.name}
              checked={option.checked}
              onChange={(e) =>
                onOptionChange(groupIndex, option.name, e.target.checked)
              }
            />
          }
          label={<StyledLabel>{option.label}</StyledLabel>}
        />
      ))}
    </Box>
  );
};
