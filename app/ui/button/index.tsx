import { type ElementType } from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.css';
import type { ButtonProps } from '@/ui/button/types';

const defaultElement = 'button';

function Button<E extends ElementType = typeof defaultElement>({
  type = 'button',
  className,
  disabled = false,
  children,
  text,
  icon = null,
  primary = false,
  secondary = false,
  as,
  ...restProps
}: ButtonProps<E>) {
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
      {icon && <span className={`${styles.icon}`}>{icon}</span>}
      {text && <span className={`${styles.text}`}>{text}</span>}
      {children}
    </TagName>
  );
}

export default Button;
