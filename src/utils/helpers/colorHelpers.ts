import { theme } from 'theme/theme';

export const getButtonColor = (isDisabled: boolean): string =>
  isDisabled ? theme.palette.grey[300] : theme.palette.common.black;

export const getTextColor = (isDisabled: boolean): string =>
  isDisabled ? theme.palette.grey[300] : theme.palette.common.black;

export const getBackgroundColor = (
  value: string,
  hasError: boolean,
): string => {
  if (hasError) return theme.palette.error.light;
  if (value) return theme.palette.primary.light;
  return 'transparent';
};

export const getBorderColor = (value: string, hasError: boolean): string => {
  if (hasError) return theme.palette.error.main;
  if (value) return theme.palette.primary.dark;
  return '';
};
