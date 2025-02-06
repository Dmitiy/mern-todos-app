import { TREE_NODES } from '@/shared/constants/tree';
import Folder from '@components/folder';

import styles from '@components/menu/menu.module.css';

function Menu() {
  return (
    <ul className={`${styles.menu}`}>
      {TREE_NODES.map((node, index) => (
        <Folder node={node} key={node.name} />
      ))}
    </ul>
  );
}

export default Menu;
