import { TREE_NODES } from '@db/tree';
import Folder from '@components/folder';

import styles from '@components/menu/menu.module.css';

function Menu() {
  return (
    <ul className={`${styles.menu}`}>
      {TREE_NODES.map((node) => (
        <Folder node={node} key={node.name} />
      ))}
    </ul>
  );
}

export default Menu;
