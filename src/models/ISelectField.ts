import { ReactNode } from 'react';

export interface IDropdownOption {
  value: string;
  label?: string;
}
export interface ISelectFieldOption extends IDropdownOption {
  secondaryLabel?: string;
  preventClosing?: boolean;
  renderMenuExtender?: (params: { onClose: () => void }) => ReactNode;
  onClick?: () => void;
}
