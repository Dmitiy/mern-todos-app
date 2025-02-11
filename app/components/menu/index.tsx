import { TREE_NODES } from '@/shared/constants/tree';
import Folder from '@components/folder';

import styles from './menu.module.css';
import classNames from 'classnames/bind';
import type { MenuProps } from './types';

function Menu({ className }: MenuProps) {
  const cx = classNames.bind(styles);
  const classes = cx(styles.logo, className);
  return (
    <nav className={classes}>
      <ul className={`${styles.menu}`}>
        {TREE_NODES.map((node) => (
          <Folder node={node} key={node.name} />
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
