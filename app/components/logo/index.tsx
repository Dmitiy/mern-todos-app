import logoImg from '@images/logo.png';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router';
import styles from './logo.module.css';
import type { LogoProps } from './types';

function Logo({ className }: LogoProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.logo, className);
  return (
    <div className={classes}>
      <NavLink to='/' className={styles.logoLink}>
        <img className={styles.logoImg} src={logoImg} alt='love frontend' />
      </NavLink>
    </div>
  );
}

export default Logo;
