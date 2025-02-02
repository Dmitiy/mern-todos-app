import classNames from 'classnames/bind';
import styles from './switch.module.css';
import type { SwitchProps } from './types';

function Switch({ className, id }: SwitchProps) {
  // ✅ bind the styles to classNames
  const cx = classNames.bind(styles);
  const classes = cx(styles.switchEl, className);
  return (
    <span className={classes}>
      <input type='checkbox' id={id} />
      <label htmlFor={id} className={styles.switch}></label>
    </span>
  );
}

export default Switch;
