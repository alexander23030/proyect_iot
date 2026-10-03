import { Graficas } from '../features/components/componentes_r/Graficas/Graficas';
import { Lecturadatos } from '../features/components/componentes_r/Lecturadatos/Lecturadatos';
import { Calidadaire } from '../features/components/componentes_r/Calidadaire/Calidadaire';
import styles from './DashboardPage.module.css';

// Datos de prueba mientras no hay service/hook
const lecturaActual = {
  co2: 650,
  temperatura: 27.4,
  humedad: 58,
};
//Renderrizado gebneral de la pagina y de todos los componentes reutilizables 
export function DashboardPage() {
  return (
    <>
<div className={styles.dashboard}>
      <h1 className={styles.titulo}>Inicio</h1>

      <Calidadaire co2={lecturaActual.co2} />

      <div className={styles.lecturas}>
        <Lecturadatos titulo="CO₂" valor={lecturaActual.co2} unidad="ppm" icono="pi pi-cloud" />
        <Lecturadatos titulo="Temperatura" valor={lecturaActual.temperatura} unidad="°C" icono="pi pi-sun" />
        <Lecturadatos titulo="Humedad" valor={lecturaActual.humedad} unidad="%" icono="pi pi-percentage" />
      </div>

      <Graficas />
    </div>
    </>
  );
}