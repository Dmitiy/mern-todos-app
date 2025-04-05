import RippleInput from '@/components/rippleInput';
import Slider from '@/components/slider';
import ThemePicker from '@/components/themePicker';
import Button from '@/ui/button';
import Container from '@/ui/container';
import Input from '@/ui/input';
import ProgressBarCompletion from '@/ui/progressBarCompletion';
import Switch from '@/ui/switchCheckbox';
import classNames from 'classnames/bind';
import styles from './settingsLayout.module.css';
import type { SettingsLayoutProps } from './types';

function SettingsLayout({ className }: SettingsLayoutProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.settings, styles.layout, className);
  return (
    <>
      <div className={`${classes}`}>
        <Container className={`${styles.settingsAside}`}></Container>
        <div className={`${styles.preview}`}>
          <Container className={`${styles.sideBarSection}`}>
            <Button>📁</Button>
          </Container>
          <Container className={`${styles.infoSection}`}>
            <Switch id={'test'} label='Custom switch' />
            <RippleInput
              type='checkbox'
              id='rippleCh1'
              name='rippleCh1'
              label='checkbox ripple'
            />
            <RippleInput
              type='checkbox'
              id='rippleCh2'
              name='rippleCh2'
              label='checkbox ripple'
            />
            <RippleInput type='radio' name='rippleRa' label='radio ripple' />
            <RippleInput type='radio' name='rippleRa' label='radio ripple' />
          </Container>
          <Container className={`${styles.searchSection}`}>
            <Input
              type='text'
              name='search'
              placeholder='Search'
              className={`${styles.input}`}
            />
          </Container>
          <Container className={`${styles.viewSection}`}>
            <label>Filter</label>
            <Button className={`${styles.button} ${styles.short}`}>👨🏼‍💻</Button>
            <Button className={`${styles.button} ${styles.short}`}>🏕️</Button>
            <Button className={`${styles.button} ${styles.short}`}>☀️</Button>
          </Container>
          <Container className={`${styles.progressSection}`}>
            <ProgressBarCompletion />
          </Container>
          <Container>
            <Slider className={`${styles.imageSection}`} />
          </Container>
          <Container className={`${styles.shapeSection}`}>
            <Button className={styles.button}>🇷🇺</Button>
            <Button className={styles.button}>🍎</Button>
          </Container>
        </div>
        <Container className={`${styles.infoSection}`}>
          <h2>🚩 Feature flags</h2>
          <Switch id='a1' label='Theme colors palette' />
          <ThemePicker />
        </Container>
      </div>
    </>
  );
}

export default SettingsLayout;
