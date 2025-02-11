import { NavLink } from 'react-router';
import styles from './navbar.module.css';
import { TREE_NODES } from '@/shared/constants/tree';

function Navbar() {
  const { nodes } = TREE_NODES[0];
  const { nodes: authNodes } = TREE_NODES[1];
  return (
    <div className={`${styles.navbar}`}>
      <nav className={styles.navPages}>
        <ul className={styles.navLinks}>
          {nodes?.slice(0, 3).map(({ name }) => (
            <li key={name}>
              <NavLink to={`${name.toLowerCase()}`}>
                {name === '/' ? name.replace('/', 'Home') : name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={styles.navAuth}>
        <ul className={styles.navLinks}>
          {authNodes?.map(({ name }) => (
            <li key={name}>
              <NavLink to={`${name.toLowerCase()}`}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
