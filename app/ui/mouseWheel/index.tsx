import classNames from 'classnames/bind';
import styles from './mouseWheel.module.css';
import type { MouseWheelProps } from './types';

function MouseWheel({ className }: MouseWheelProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.mouseIcon, className);

  return (
    <ul className={classes}>
      <li className={styles.wheel}></li>
      <li className={styles.wheel}></li>
      <li className={styles.wheel}></li>
    </ul>
  );
}

export default MouseWheel;
