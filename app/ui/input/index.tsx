import classNames from 'classnames/bind';
import type { InputProps } from './types';
import styles from './input.module.css';
import type { ComponentProps } from 'react';

function Input({
  type,
  value,
  name,
  className,
  onChange,
  placeholder,
  defaultChecked,
  ...rest
}: InputProps & ComponentProps<'input'>) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.input, className);
  return (
    <>
      <input
        defaultChecked={defaultChecked}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classes}
        onChange={onChange}
        {...rest}
      />
    </>
  );
}

export default Input;
