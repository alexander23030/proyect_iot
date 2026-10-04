import { Graficas } from '../features/components/componentes_r/Graficas/Graficas';
import { Lecturadatos } from '../features/components/componentes_r/Lecturadatos/Lecturadatos';
import { Calidadaire } from '../features/components/componentes_r/Calidadaire/Calidadaire';
import styles from './DashboardPage.module.css';

// Datos de prueba mientras no hay service/hook
// Datos de prueba: cada elemento es una lectura completa del sensor.
// Más adelante este arreglo vendrá del hook de MQTT.
const historial = [
  { hora: '08:00', co2: 520,  temperatura: 24.1, humedad: 55 },
  { hora: '09:00', co2: 640,  temperatura: 24.8, humedad: 56 },
  { hora: '10:00', co2: 810,  temperatura: 25.6, humedad: 57 },
  { hora: '11:00', co2: 980,  temperatura: 26.3, humedad: 58 },
  { hora: '12:00', co2: 600, temperatura: 27.0, humedad: 58 },
  { hora: '13:00', co2: 1320, temperatura: 27.4, humedad: 59 },
  { hora: '14:00', co2: 1700, temperatura: 27.2, humedad: 58 },
];

//Renderizado general de la pagina y de todos los componentes reutilizables 
export function DashboardPage() {
    // Valor derivado: se calcula en el render, no se guarda aparte
  const lecturaActual = historial[historial.length - 1];

  return (
  <div className={styles.dashboard}>
        <h1 className={styles.titulo}>Inicio</h1>

        <Calidadaire co2={lecturaActual.co2} />

        <div className={styles.lecturas}>
          <Lecturadatos titulo="CO₂" valor={lecturaActual.co2} unidad="ppm" icono="pi pi-cloud" />
          <Lecturadatos titulo="Temperatura" valor={lecturaActual.temperatura} unidad="°C" icono="pi pi-sun" />
          <Lecturadatos titulo="Humedad" valor={lecturaActual.humedad} unidad="%" icono="pi pi-percentage" />
        </div>

        {/*Para crear mas graficas solo se reutiliza el componente */}
        <Graficas
        titulo="Lecturas de CO₂"
        etiqueta="CO₂ (ppm)"
        historial={historial}
        campo="co2" 
        />
        <Graficas titulo="Temperatura" 
        etiqueta="°C" 
        historial={historial} 
        campo="temperatura" />

        <Graficas titulo="Humedad" 
        etiqueta="% Porcentaje"   
        historial={historial} 
        campo="humedad" />  
      </div>
    );
}