import classNames from 'classnames/bind';
import styles from './checkbox.module.css';
import type { CheckboxProps } from './types';

function Checkbox({
  onChange,
  value,
  name,
  label = '',
  className,
  checked,
}: CheckboxProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.customCheckbox, className);
  const customCheckboxStyle = cx(styles.checkbox, {
    // [styles.rippleEffect]: checked,
  });
  const hasLabelText = label.length > 0;
  return (
    <>
      <label htmlFor={name} className={classes}>
        <input
          type='checkbox'
          id={name}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className={customCheckboxStyle}></span>
        {hasLabelText && <span className={styles.labelText}>{label}</span>}
      </label>
    </>
  );
}

export default Checkbox;
