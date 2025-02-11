import classNames from 'classnames/bind';
import styles from './copyright.module.css';
import type { CopyrightProps } from './types';

function Copyright({ className, title }: CopyrightProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.copyright, className);

  return (
    <small className={classes}>
      &#169; {new Date().getFullYear()} {title}
    </small>
  );
}

export default Copyright;
