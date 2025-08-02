export interface IFilterOption {
  name: string;
  label: string;
  checked: boolean;
}
export interface IFilterGroup {
  groupTitle?: string;
  options: IFilterOption[];
}
