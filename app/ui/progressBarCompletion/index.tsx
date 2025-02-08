import classNames from 'classnames';

import styles from './progressBarCompletion.module.css';
import type { ProgressBarCompletionProps } from './types';

function ProgressBarCompletion({ className }: ProgressBarCompletionProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.progressBar, className);

  return (
    <div className={`${classes}`}>
      <div className={`${styles.progressBarCompletion}`}></div>
    </div>
  );
}

export default ProgressBarCompletion;
