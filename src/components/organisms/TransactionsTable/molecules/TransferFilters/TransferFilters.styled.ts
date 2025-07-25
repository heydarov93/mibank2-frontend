import { styled } from '@mui/material/styles';

import { ReactComponent as ExpandMoreIcon } from 'assets/icons/ExpandMoreIconSmall.svg';
import { SelectField } from 'components/molecules/SelectField/SelectField';
import { theme } from 'theme/theme';

const HALF_SVG_HEIGHT = 10;

const StyledSelectFieldComponent = styled(SelectField)(({ theme }) => ({
  '.MuiSelect-select p': {
    fontWeight: 'bold',
  },
  svg: {
    fill: theme.palette.common.black,
    top: `calc(50% - ${HALF_SVG_HEIGHT}px)`,
  },
  '&, &:hover:not(.Mui-disabled)': {
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

StyledSelectFieldComponent.defaultProps = {
  IconComponent: ExpandMoreIcon,
  openedColor: theme?.palette.primary.main,
};

export const StyledSelectField =
  StyledSelectFieldComponent as typeof SelectField;
