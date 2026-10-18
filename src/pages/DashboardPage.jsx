import { useState } from 'react';
import { Graficas } from '../features/components/componentes_r/Graficas/Graficas';
import { Lecturadatos } from '../features/components/componentes_r/Lecturadatos/Lecturadatos';
import { Calidadaire } from '../features/components/componentes_r/Calidadaire/Calidadaire';
import { useMediciones } from '../features/hooks/useMediciones';
import styles from './DashboardPage.module.css';
import { useUltLectura } from '../features/hooks/useUltLectura';

// filtros disponibles
const RANGOS = [
  { etiqueta: '6 h', horas: 6 },
  { etiqueta: '24 h', horas: 24 },
  { etiqueta: '3 d', horas: 72 },
  { etiqueta: '5 d', horas: 120 },
];

export function DashboardPage() {
  // rango seleccionado; solo afecta a las gráficas
  const [horas, setHoras] = useState(24);

  // historial para las gráficas (depende del filtro)
  const { historial, error: errorHistorial } = useMediciones(horas);

  // última lectura para los indicadores (fija, ignora el filtro)
  const { lecturaActual, cargando, error: errorActual } = useUltLectura();

  // mientras llega la primera respuesta 
  if (cargando) return <p>Cargando mediciones...</p>;

 return (
    <div className={styles.dashboard}>
      <h1 className={styles.titulo}>Inicio</h1>

      {/* si el backend falla después de cargar, avisa pero deja los últimos datos */}
      {errorActual && <p>{errorActual}</p>}

      <Calidadaire co2={lecturaActual.co2} />

      <div className={styles.lecturas}>
        <Lecturadatos titulo="CO₂" valor={lecturaActual.co2} unidad="ppm" icono="pi pi-cloud" />
        <Lecturadatos titulo="Temperatura" valor={lecturaActual.temperatura} unidad="°C" icono="pi pi-sun" />
        <Lecturadatos titulo="Humedad" valor={lecturaActual.humedad} unidad="%" icono="pi pi-percentage" />
      </div>

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

      {errorHistorial && <p>{errorHistorial}</p>}

      {/* un rango sin datos solo afecta a las gráficas, no a los indicadores */}
      {historial.length === 0 ? (
        <p>No hay mediciones en este rango.</p>
      ) : (
        <>
          <Graficas titulo="Lecturas de CO₂" etiqueta="CO₂ (ppm)" historial={historial} campo="co2" />
          <Graficas titulo="Temperatura" etiqueta="°C" historial={historial} campo="temperatura" />
          <Graficas titulo="Humedad" etiqueta="% Porcentaje" historial={historial} campo="humedad" />
        </>
      )}
    </div>
  );
}
