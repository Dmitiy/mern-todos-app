import classNames from 'classnames/bind';
import styles from './rippleInput.module.css';
import type { RippleInputProps } from './types';
import { useEffect, useRef, useState } from 'react';

function RippleInput({ className, id, name, label, type }: RippleInputProps) {
  // const [isActive, setIsActive] = useState(false);
  const rippleInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (rippleInputRef.current) {
  //     rippleInputRef.current.checked = isActive;
  //   }
  // }, [isActive]);

  // const onToggleRipple = () => {
  //   setIsActive((prev) => !prev);
  // };

  const cx = classNames.bind(styles);
  const classes = cx(styles.rippleControl, className);

  return (
    <label htmlFor={id} className={classes}>
      <input ref={rippleInputRef} type={type} id={id} name={name} />
      <span className={styles.rippleInput}></span>
      {label}
    </label>
  );
}

export default RippleInput;
