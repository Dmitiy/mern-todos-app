import { NavLink } from 'react-router';

import navbarStyles from './navbar.module.css';
import logoImg from '@images/logo.png';

function Navbar() {
  return (
    <div className={`layout ${navbarStyles.navbar}`}>
      <NavLink to='/' className={navbarStyles.logoLink}>
        <img
          className={navbarStyles.logoImg}
          src={logoImg}
          alt='love frontend'
        />
      </NavLink>
      <nav className={navbarStyles.navLinks}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/countries'>Countries</NavLink>
        <NavLink to='/todos'>Todos</NavLink>
      </nav>
      <nav className={`${navbarStyles.navLinks} ${navbarStyles.navAuth}`}>
        <NavLink to='/registration'>Registration</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
