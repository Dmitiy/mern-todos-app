import classNames from 'classnames/bind';
import styles from './totalCounter.module.css';
import type { TotalCounterProps } from './types';

function TotalCounter({ text = '', className }: TotalCounterProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.totalCounter, className);

  return <span className={classes}>{text}</span>;
}

export default TotalCounter;
