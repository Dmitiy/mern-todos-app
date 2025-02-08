import classNames from 'classnames';

import styles from './container.module.css';
import type { ContainerProps } from './types';

function Container({ className, children }: ContainerProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.container, className);

  return <div className={classes}>{children}</div>;
}

export default Container;
