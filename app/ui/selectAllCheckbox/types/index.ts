export type SelectAllCheckboxProps = {
  name: string;
  totalChecked: number;
  totalItems: number;
  label?: string;
  className?: string;
  onSelectAll: (isAllChecked: boolean) => void;
};
