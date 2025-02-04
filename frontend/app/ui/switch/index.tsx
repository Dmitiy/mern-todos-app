import classNames from 'classnames/bind';
import styles from './switch.module.css';
import type { SwitchProps } from './types';
import { useEffect, useRef, useState } from 'react';

function Switch({ className, id, label }: SwitchProps) {
  const [isActiveSwitch, setIsActiveSwitch] = useState(false);
  const switchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (switchInputRef.current) {
      switchInputRef.current.checked = isActiveSwitch;
    }
  }, [isActiveSwitch]);

  const onToggleSwitch = () => {
    setIsActiveSwitch((prev) => !prev);
  };

  const cx = classNames.bind(styles);
  const classes = cx(styles.switchControl, className);

  return (
    <span className={classes}>
      <input type='checkbox' id={id} ref={switchInputRef} />
      {/* 🔥 BUG: fix label click */}
      <label htmlFor={id} className={styles.switch}></label>
      {label && (
        <span className={styles.switchText} onClick={onToggleSwitch}>
          {label}
        </span>
      )}
    </span>
  );
}

export default Switch;
