//configuración global de la librería
//registro en Chart.js para armar las graficas
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale, // eje de tiempo (type: 'time')
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);