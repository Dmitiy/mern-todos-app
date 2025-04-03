export type RippleInputProps = {
  type: 'checkbox' | 'radio';
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  id?: string;
  className?: string;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
