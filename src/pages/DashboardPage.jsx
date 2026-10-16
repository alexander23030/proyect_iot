import { Graficas } from '../features/components/componentes_r/Graficas/Graficas';
import { Lecturadatos } from '../features/components/componentes_r/Lecturadatos/Lecturadatos';
import { Calidadaire } from '../features/components/componentes_r/Calidadaire/Calidadaire';
import { useMediciones } from '../features/hooks/useMediciones';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  // el hook trae las mediciones del backend; la página solo las muestra
  const { historial, lecturaActual, cargando, error } = useMediciones();

  // mientras llega la primera respuesta
  if (cargando) return <p>Cargando mediciones...</p>;

  // si no hay datos backend caído o tabla vacía
  if (!lecturaActual) return <p>{error ?? 'Todavía no hay mediciones.'}</p>;

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.titulo}>Inicio</h1>

      {/* si el backend falla después de cargar, avisa pero deja los últimos datos */}
      {error && <p>{error}</p>}

      <Calidadaire co2={lecturaActual.co2} />

      <div className={styles.lecturas}>
        <Lecturadatos titulo="CO₂" valor={lecturaActual.co2} unidad="ppm" icono="pi pi-cloud" />
        <Lecturadatos titulo="Temperatura" valor={lecturaActual.temperatura} unidad="°C" icono="pi pi-sun" />
        <Lecturadatos titulo="Humedad" valor={lecturaActual.humedad} unidad="%" icono="pi pi-percentage" />
      </div>

      <Graficas
        titulo="Lecturas de CO₂"
        etiqueta="CO₂ (ppm)"
        historial={historial}
        campo="co2"
      />
      <Graficas
        titulo="Temperatura"
        etiqueta="°C"
        historial={historial}
        campo="temperatura"
      />
      <Graficas
        titulo="Humedad"
        etiqueta="% Porcentaje"
        historial={historial}
        campo="humedad"
      />
    </div>
  );
}