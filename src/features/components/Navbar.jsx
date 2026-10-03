import { NavLink } from 'react-router';
import styles from './navbar.module.css';

function obtenerClaseEnlace({ isActive }) {
  return isActive ? `${styles.enlace} ${styles.activo}` : styles.enlace;
}

export function Navbar() {
  return (
    <nav className={styles.menu}>
      <div className={styles.interior}>
        <NavLink to="/" className={styles.marca}>
          <span className={styles.logo} />
          Mi App
        </NavLink>
        <NavLink to="/" end className={obtenerClaseEnlace}>
          Inicio
        </NavLink>
        <NavLink to="/reportes" className={obtenerClaseEnlace}>
          Reportes
        </NavLink>
      </div>
    </nav>
  );
}