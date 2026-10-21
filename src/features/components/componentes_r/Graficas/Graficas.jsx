import { Line } from 'react-chartjs-2';
import styles from './Graficas.module.css';

const COLORES = {
  texto: '#9ca3af',
  rejilla: 'rgba(156, 163, 175, 0.15)',
  acento: '#c084fc',
  relleno: 'rgba(192, 132, 252, 0.15)',
};

// Las opciones no dependen de los datos, por eso siguen fuera del componente
const opciones = {
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: COLORES.texto } },
  },
  scales: {
    x: {  ticks: {
    color: COLORES.texto,
    autoSkip: true,
    maxTicksLimit: 12,
    maxRotation: 0,
  },
  grid: { color: COLORES.rejilla },
},
    y: { ticks: { color: COLORES.texto }, grid: { color: COLORES.rejilla } },
  },
};

// historial: arreglo de lecturas  →  [{ hora, co2, temperatura, humedad }, ...]
// campo: qué propiedad de cada lectura se grafica ('co2', 'temperatura', ...)
export function Graficas({ titulo, etiqueta, historial, campo }) {
  // Los datos de la gráfica se derivan de las props en cada render
  const datos = {
    labels: historial.map((lectura) => lectura.hora),
    datasets: [
      {
        label: etiqueta,
        data: historial.map((lectura) => lectura[campo]),
        borderColor: COLORES.acento,
        backgroundColor: COLORES.relleno,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  return (
    <section className={styles.tarjeta}>
      <h2 className={styles.titulo}>{titulo}</h2>
      <div className={styles.grafica}>
        <Line data={datos} options={opciones} />
      </div>
    </section>
  );
}