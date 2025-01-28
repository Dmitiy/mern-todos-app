import { NavLink } from 'react-router';

function Navbar() {
  return (
    <div>
      <NavLink to='/'>Logo</NavLink>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/countries'>Countries</NavLink>
        <NavLink to='/todos'>Todos</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
