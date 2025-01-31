import styles from './selectAllCheckbox.module.css';
import type { SelectAllCheckboxProps } from './types';

function SelectAllCheckbox({
  ref,
  label = '',
  onSelectAll,
}: SelectAllCheckboxProps) {
  return (
    <>
      <label onClick={onSelectAll}>
        <input
          type='checkbox'
          name='Select all'
          ref={ref}
          className={`${styles.selectAllCheckbox}`}
        />
        <span>{label}</span>
      </label>
    </>
  );
}

export default SelectAllCheckbox;
