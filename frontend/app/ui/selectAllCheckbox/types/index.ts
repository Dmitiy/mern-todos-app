import { type Ref } from 'react';

export type SelectAllCheckboxProps = {
  ref: Ref<HTMLInputElement>;
  label?: string;
  onSelectAll: () => void;
};
