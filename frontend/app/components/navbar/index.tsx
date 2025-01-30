import { NavLink } from 'react-router';

import styles from './navbar.module.css';
import logoImg from '@images/logo.png';
import { TREE_NODES } from '@/db/tree';

function Navbar() {
  const { name, nodes } = TREE_NODES[0];
  return (
    <div className={`layout ${styles.navbar}`}>
      <NavLink to='/' className={styles.logoLink}>
        <img className={styles.logoImg} src={logoImg} alt='love frontend' />
      </NavLink>
      <nav className={styles.navPages}>
        <ul className={styles.navLinks}>
          {nodes?.map(({ name }) => (
            <li key={name}>
              <NavLink to={`${name.toLowerCase()}`}>
                {name === '/' ? name.replace('/', 'Home') : name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
