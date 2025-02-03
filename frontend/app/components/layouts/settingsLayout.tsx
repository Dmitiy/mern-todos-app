import { useEffect } from 'react';
import classNames from 'classnames/bind';
import Button from '@/ui/button';
import logoImg from '@images/logo.png';
import styles from './settingsLayout.module.css';
import Input from '@/ui/input';

function SettingsLayout() {
  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement | null;
    const inputs = document.querySelectorAll(
      "input[name='theme']"
    ) as NodeListOf<HTMLInputElement>;

    const theme = localStorage.getItem('theme-color');

    const updateRoot = (value: string) => {
      if (root) {
        root.style.setProperty('--theme-color', `var(--${value})`);
      }
    };

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

  // ✅ bind the styles to classNames
  const cx = classNames.bind(styles);
  const classes = cx(styles.settingsLayout);
  return (
    <>
      <div className={`${classes}`}>
        <div className={`${styles.section} ${styles.themePickerSection}`}>
          <Input type='radio' name='theme' value='white' defaultChecked /> white
          <Input type='radio' name='theme' value='red' /> red
          <Input type='radio' name='theme' value='orange' /> orange
          <Input type='radio' name='theme' value='yellow' /> yellow
          <Input type='radio' name='theme' value='green' /> green
          <Input type='radio' name='theme' value='blue' /> blue
          <Input type='radio' name='theme' value='indigo' /> indigo
          <Input type='radio' name='theme' value='violet' /> violet
        </div>
        <div
          className={`${styles.section} ${styles.sideBarSection} ${styles.vertical}`}>
          <Button type='button' className={`${styles.button}`}>
            📁
          </Button>
          <Button type='button' className={`${styles.button}`}>
            ⚓️
          </Button>
          <Button type='button' className={`${styles.button}`}>
            🔗
          </Button>
          <Button type='button' className={`${styles.button}`}>
            🛠️
          </Button>
          <Button type='button' className={`${styles.button}`}>
            🚩
          </Button>
        </div>
        <div className={`${styles.section} ${styles.searchSection}`}>
          <Input
            type='text'
            placeholder='Search'
            name='search'
            className={`${styles.input}`}
          />
        </div>
        <div className={`${styles.section} ${styles.viewSection}`}>
          <label>View</label>
          <Button type='button' className={`${styles.button} ${styles.short}`}>
            👨🏼‍💻
          </Button>
          <Button type='button' className={`${styles.button} ${styles.short}`}>
            🏕️
          </Button>
          <Button type='button' className={`${styles.button} ${styles.short}`}>
            ☀️
          </Button>
        </div>
        <div className={`${styles.section} ${styles.progressSection}`}>
          <div className={`${styles.progressBar}`}>
            <div className={`${styles.progressBarCompletion}`}></div>
          </div>
        </div>
        <div
          className={`${styles.section} ${styles.imageSection} ${styles.vertical}`}>
          <img src={logoImg} alt='love frontend' />
          <div className={`${styles.imageSectionRotator}`}>
            <span className={`${styles.imageSectionDot}`}></span>
            <span className={`${styles.imageSectionDot}`}></span>
            <span className={`${styles.imageSectionDot}`}></span>
          </div>
        </div>
        <div className={`${styles.section} ${styles.shapeSection}`}>
          <Button type='button' className={`${styles.button}`}>
            🇷🇺
          </Button>
          <Button type='button' className={`${styles.button}`}>
            
          </Button>
        </div>
      </div>
    </>
  );
}

export default SettingsLayout;
