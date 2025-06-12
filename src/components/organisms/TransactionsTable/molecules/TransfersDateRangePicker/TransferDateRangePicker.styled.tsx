import { styled } from '@mui/material';

import { ReactComponent as CalendarIcon } from 'assets/icons/Calendar.svg';
import { InputField } from 'components/atoms/InputField/InputField';

const StyledInputFieldComponent = styled(InputField)(({ theme }) => ({
  '.MuiInputBase-root, input': { cursor: 'pointer' },
  svg: { fill: theme.palette.grey[500] },
}));

StyledInputFieldComponent.defaultProps = {
  readOnly: true,
  InputProps: {
    endAdornment: <CalendarIcon />,
  },
};

export const StyledInputField = StyledInputFieldComponent as typeof InputField;
