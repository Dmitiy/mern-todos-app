import classNames from 'classnames/bind';
import type { CheckboxProps } from './types';
import styles from './checkbox.module.css';

function Checkbox({
  onChange,
  value,
  name,
  className,
  checked,
}: CheckboxProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.checkbox, className);
  return (
    <>
      <input
        type='checkbox'
        name={name}
        value={value}
        checked={checked}
        className={classes}
        onChange={onChange}
      />
    </>
  );
}

export default Checkbox;
