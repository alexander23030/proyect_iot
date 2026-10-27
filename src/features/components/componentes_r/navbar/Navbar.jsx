import { NavLink } from 'react-router';
import { useState } from 'react';
import styles from './navbar.module.css';
import { ReporteModal } from '../ReporteModal.jsx/ReporteModal';

function obtenerClaseEnlace({ isActive }) {
  return isActive ? `${styles.enlace} ${styles.activo}` : styles.enlace;
}

export function Navbar() {
  // Estado reportes
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <> {/* <--- Aquí abrimos el fragmento para englobar mas de un elemento*/}
      <nav className={styles.menu}>
        <div className={styles.interior}>
          <NavLink to="/" className={styles.marca}>
            <span className={styles.logo} />
            Medidor calidad de aire
          </NavLink>
          <NavLink to="/" end className={obtenerClaseEnlace}>
            Inicio
          </NavLink>
          {/* Usamos un botón o prevenimos la navegación por defecto si NavLink requiere un 'to' */}
          <NavLink 
            to="#" 
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }} 
            className={obtenerClaseEnlace}
          >
            Reportes
          </NavLink>
        </div>
      </nav>

      {/* Ventana emergente (Modal) */}
      <ReporteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
    );
  }

