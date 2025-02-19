export interface FilterOption {
  name: string;
  label: string;
  checked: boolean;
}
export interface FilterGroup {
  groupTitle?: string;
  options: FilterOption[];
}
export interface FilterGroupOptionsProps {
  group: FilterGroup;
  groupIndex: number;
  onOptionChange: (
    groupIndex: number,
    optionName: string,
    checked: boolean,
  ) => void;
}
