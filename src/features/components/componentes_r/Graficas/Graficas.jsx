import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import styles from './Graficas.module.css';

const COLORES = {
  texto: '#9ca3af',
  rejilla: 'rgba(156, 163, 175, 0.15)',
  acento: '#c084fc',
  relleno: 'rgba(192, 132, 252, 0.15)',
};

//Campos que define el eje x
// cada filtro (en horas) define cada cuánto se marca el eje X y con qué formato
const EJE_POR_RANGO = {
  6: { unit: 'minute', stepSize: 30, formato: 'hh:mm a' },
  24: { unit: 'hour', stepSize: 2, formato: 'hh:mm a' },
  72: { unit: 'hour', stepSize: 6, formato: 'dd/MM HH:mm' },
  120: { unit: 'hour', stepSize: 12, formato: 'dd/MM HH:mm' },
};
// Las opciones no dependen de los datos, por eso siguen fuera del componente
function crearOpciones(horas) {
  const eje = EJE_POR_RANGO[horas];

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: COLORES.texto } },
    },

    // atributos de cada eje
    scales: {
      x: {
        type: 'time',
        time: {
          unit: eje.unit,
          displayFormats: { [eje.unit]: eje.formato },
        },
        ticks: {
          stepSize: eje.stepSize,
          color: COLORES.texto,
          maxRotation: 0,
        },
        grid: { color: COLORES.rejilla },
      },  
      y: { ticks: { color: COLORES.texto }, grid: { color: COLORES.rejilla } },
    },
  };
}

// historial: arreglo de lecturas  →  [{ hora, co2, temperatura, humedad }, ...]
// campo: qué propiedad de cada lectura se grafica ('co2', 'temperatura', ...)
// horas: filtro activo, define la escala del eje X
export function Graficas({ titulo, etiqueta, historial, campo, horas }) {
  const datos = {
    datasets: [
      {
        label: etiqueta,
        // con eje de tiempo cada punto lleva su fecha real en x
        data: historial.map((lectura) => ({
          x: new Date(lectura.fecha),
          y: lectura[campo],
        })),
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
      <Line data={datos} options={crearOpciones(horas)} />
      </div>
    </section>
  );
}