import classNames from 'classnames';
import { useEffect } from 'react';
import Container from '@/ui/container';
import Input from '@/ui/input';
import Button from '@/ui/button';
import styles from './themePicker.module.css';
import type { ThemePickerProps } from './types';
import { THEME_COLORS } from '@/shared/constants/themeColors';

function ThemePicker({ className }: ThemePickerProps) {
  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement | null;
    const inputs = document.querySelectorAll(
      "input[name='theme']"
    ) as NodeListOf<HTMLInputElement>;

    const updateRoot = (value: string) => {
      if (root) {
        root.style.setProperty('--theme-color', `var(--${value})`);
      }
    };
    const theme = localStorage?.getItem('theme-color');

    if (theme) {
      inputs.forEach((input) => {
        if (input.value === theme) {
          input.checked = true;
        }
      });
      updateRoot(theme);
    }

    inputs.forEach((input) => {
      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateRoot(target.value);
        localStorage.setItem('theme-color', target.value);
      };
    });
  }, []);

  const cx = classNames.bind(styles);
  const classes = cx(styles.themePickerSection, className);
  return (
    <Container className={classes}>
      {THEME_COLORS.map((color, index) => (
        <Button key={color}>
          <Input
            type='radio'
            name='theme'
            value={color}
            defaultChecked={index === 0 ? true : false}
          />
        </Button>
      ))}
    </Container>
  );
}

export default ThemePicker;
