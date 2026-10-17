import { useState } from 'react';
import { Graficas } from '../features/components/componentes_r/Graficas/Graficas';
import { Lecturadatos } from '../features/components/componentes_r/Lecturadatos/Lecturadatos';
import { Calidadaire } from '../features/components/componentes_r/Calidadaire/Calidadaire';
import { useMediciones } from '../features/hooks/useMediciones';
import styles from './DashboardPage.module.css';

// filtros disponibles: lo que se muestra en el botón y cuántas horas pide al backend
const RANGOS = [
  { etiqueta: '6 h', horas: 6 },
  { etiqueta: '24 h', horas: 24 },
  { etiqueta: '3 d', horas: 72 },
  { etiqueta: '5 d', horas: 120 },
];

export function DashboardPage() {
  // rango seleccionado; al cambiarlo, el hook vuelve a pedir los datos al backend
  const [horas, setHoras] = useState(24);

  // el hook trae las mediciones del backend; la página solo las muestra
  const { historial, lecturaActual, cargando, error } = useMediciones(horas);

  // mientras llega la primera respuesta (solo la primera carga reemplaza la página completa)
  if (cargando) return <p>Cargando mediciones...</p>;

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.titulo}>Inicio</h1>

      <div className={styles.filtros}>
        {RANGOS.map((rango) => (
          <button
            key={rango.horas}
            type="button"
            aria-pressed={horas === rango.horas}
            className={horas === rango.horas ? styles.filtroActivo : styles.filtro}
            onClick={() => setHoras(rango.horas)}
          >
            {rango.etiqueta}
          </button>
        ))}
      </div>

      {/* si el backend falla después de cargar, avisa pero deja los últimos datos */}
      {error && <p>{error}</p>}

      {/* sin datos en este rango (o backend caído): se avisa, pero los botones siguen disponibles */}
      {!lecturaActual ? (
        <p>{error ? null : 'No hay mediciones en este rango.'}</p>
      ) : (
        <>
          <Calidadaire co2={lecturaActual.co2} />

          <div className={styles.lecturas}>
            <Lecturadatos titulo="CO₂" valor={lecturaActual.co2} unidad="ppm" icono="pi pi-cloud" />
            <Lecturadatos titulo="Temperatura" valor={lecturaActual.temperatura} unidad="°C" icono="pi pi-sun" />
            <Lecturadatos titulo="Humedad" valor={lecturaActual.humedad} unidad="%" icono="pi pi-percentage" />
          </div>

          <Graficas titulo="Lecturas de CO₂" etiqueta="CO₂ (ppm)" historial={historial} campo="co2" />
          <Graficas titulo="Temperatura" etiqueta="°C" historial={historial} campo="temperatura" />
          <Graficas titulo="Humedad" etiqueta="% Porcentaje" historial={historial} campo="humedad" />
        </>
      )}
    </div>
  );
}