import { Line } from 'react-chartjs-2';
import styles from './Graficas.module.css';

const COLORES = {
  texto: '#9ca3af',
  rejilla: 'rgba(156, 163, 175, 0.15)',
  acento: '#c084fc',
  relleno: 'rgba(192, 132, 252, 0.15)',
};

const datos = {
  labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
  datasets: [
    {
      label: 'Concentración CO2',
      data: [22.5, 23.1, 24.8, 26.2, 27.9, 28.4, 27.6],
      borderColor: COLORES.acento,
      backgroundColor: COLORES.relleno,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
    },
  ],
}; 
 
 
const opciones = {
  maintainAspectRatio: false, //la altura de su contenedo¿r
  plugins: {
    legend: { labels: { color: COLORES.texto } }, //ajuste de color de letras para que se lean en fondo oscuro.
  },
  //ejes. x es el eje horizontal (las horas) y y el vertical (los grados)
  scales: {
    x: { ticks: { color: COLORES.texto }, grid: { color: COLORES.rejilla } },
    y: { ticks: { color: COLORES.texto }, grid: { color: COLORES.rejilla } },
  },
};
// una función que devuelve lo que se muestra en pantalla
export function Graficas() {
  return (
    <section className={styles.tarjeta}>
      <h2 className={styles.titulo}>Lecturas de CO2</h2>
        {/*componente que dibuja la gráfica*/}
      <div className={styles.grafica}>
        <Line data={datos} options={opciones} />
      </div>
    </section>
  );
}