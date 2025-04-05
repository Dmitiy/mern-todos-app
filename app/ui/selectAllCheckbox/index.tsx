import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './selectAllCheckbox.module.css';
import type { SelectAllCheckboxProps } from './types';

function SelectAllCheckbox({
  name,
  label = '',
  className,
  totalChecked,
  totalItems,
  onSelectAll,
}: SelectAllCheckboxProps) {
  const indeterminateRef = useRef<HTMLInputElement>(null);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  useEffect(() => {
    updateIndeterminateState();
  }, [totalChecked, totalItems]);

  const updateIndeterminateState = () => {
    if (!indeterminateRef.current) {
      return;
    }

    if (totalChecked === 0) {
      indeterminateRef.current!.checked = false;
      indeterminateRef.current!.indeterminate = false;
      setIsCheckedAll(false);
    } else if (totalChecked === totalItems) {
      indeterminateRef.current!.checked = true;
      indeterminateRef.current!.indeterminate = false;
      setIsCheckedAll(true);
    } else {
      indeterminateRef.current!.checked = false;
      indeterminateRef.current!.indeterminate = true;
      setIsCheckedAll(false);
    }
  };

  const cx = classNames.bind(styles);
  const classes = cx(styles.selectAllControl, className);
  const customCheckboxStyle = cx(styles.checkbox, {
    [styles.rippleEffect]: isCheckedAll,
  });
  const hasLabelText = label.length > 0;

  return (
    <label
      className={classes}
      htmlFor={name}
      onClick={() => (hasLabelText ? onSelectAll(isCheckedAll) : undefined)}>
      <input
        type='checkbox'
        ref={indeterminateRef}
        name={name}
        id={name}
        onChange={(e) => {
          onSelectAll(e.target.checked);
        }}
      />
      <span className={customCheckboxStyle}></span>
      {hasLabelText && <span className={styles.labelText}>{label}</span>}
    </label>
  );
}

export default SelectAllCheckbox;
