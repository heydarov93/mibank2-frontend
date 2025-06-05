import { theme } from 'theme/theme';

export const getButtonColor = (isDisabled: boolean) =>
  isDisabled ? theme.palette.grey[300] : theme.palette.common.black;

export const getTextColor = (isDisabled: boolean) =>
  isDisabled ? theme.palette.grey[300] : theme.palette.common.black;
