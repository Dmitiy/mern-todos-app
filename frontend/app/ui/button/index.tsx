import { type ElementType } from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.css';
import type { ButtonProps } from '@ui/types/button';

const defaultElement = 'button';

function Button<E extends ElementType = typeof defaultElement>({
  type = 'button',
  className,
  disabled = false,
  children,
  icon = null,
  primary = false,
  secondary = false,
  as,
  ...restProps
}: ButtonProps<E>) {
  // ✅ bind the styles to classNames
  const cx = classNames.bind(styles);
  const classes = cx(
    styles.button,
    {
      [styles.primary]: primary,
      [styles.secondary]: secondary,
    },
    className
  );
  const TagName = as || defaultElement;

  return (
    <TagName type={type} disabled={disabled} className={classes} {...restProps}>
      <span className={`${styles.icon}`}>{icon}</span>
      <span className={`${styles.text}`}>{children}</span>
    </TagName>
  );
}

export default Button;
