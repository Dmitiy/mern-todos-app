import classNames from 'classnames/bind';
import type { SelectAllCheckboxProps } from './types';
import styles from './selectAllCheckbox.module.css';

function SelectAllCheckbox({ ref, name, className }: SelectAllCheckboxProps) {
  // ✅ bind the styles to classNames
  const cx = classNames.bind(styles);
  const classes = cx(styles.checkbox, className);
  return (
    <>
      <input type='checkbox' name={name} ref={ref} className={classes} />
    </>
  );
}

export default SelectAllCheckbox;
