import Button from '@/ui/button';
import Input from '@/ui/input';
import ProgressBarCompletion from '@/ui/progressBarCompletion';
import Container from '@/ui/container';
import classNames from 'classnames/bind';
import styles from './settingsLayout.module.css';
import type { SettingsLayoutProps } from './types';
import Switch from '@/ui/switch';
import Slider from '@/components/slider';

function SettingsLayout({ className }: SettingsLayoutProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.settingsLayout, className);
  return (
    <>
      <div className={`${classes}`}>
        <Container className={`${styles.sideBarSection}`}>
          <Button>📁</Button>
          <Button>🚩</Button>
        </Container>
        <Container className={`${styles.infoSection}`}>
          <Switch id={'test'} label='Custom switch' />
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
    </>
  );
}

export default SettingsLayout;
