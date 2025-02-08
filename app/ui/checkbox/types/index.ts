import { type Ref } from 'react';

export type CheckboxProps = {
  name: string;
  value: string;
  checked: boolean;
  className?: string;
  onChange: () => void;
};
