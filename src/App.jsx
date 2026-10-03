import { Outlet } from "react-router";
import { Navbar } from './features/components/componentes_r/navbar/Navbar.jsx';
import styles from './App.module.css';



//App ya no tiene contenido propio solo define dónde aparecen las páginas
//APP ahora llega a la pantalla a través del router.
function  App(){
  return (
    <>
      <Navbar />
      <main className={styles.contenido}>
        <Outlet />
      </main>
    </>
  );
}
export default App;