import classNames from 'classnames';
import styles from './slider.module.css';
import type { SliderProps } from './types';
import logoImg from '@images/logo.png';

function Slider({ className }: SliderProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.imageSection, className);
  return (
    <div className={classes}>
      <img src={logoImg} alt='love frontend' />
      <div className={`${styles.imageSectionRotator}`}>
        <span className={`${styles.imageSectionDot}`}></span>
        <span className={`${styles.imageSectionDot}`}></span>
        <span className={`${styles.imageSectionDot}`}></span>
      </div>
    </div>
  );
}

export default Slider;
