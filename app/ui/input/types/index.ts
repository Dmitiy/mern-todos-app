export type InputProps = {
  name: string;
  type: string;
  value?: string;
  className?: string;
  placeholder?: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
