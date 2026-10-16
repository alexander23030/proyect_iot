import { useEffect, useState } from 'react';
import { obtenerMediciones } from '../services/medicionesService';

const INTERVALO_MS = 5000; // cada cuántos ms se consulta el backend
const LECTURAS = 20;     // cuántas lecturas se muestran en las gráficas

export function useMediciones() {
    //estaods historial para guardar, cargando (a la espera de datos) y error
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  //se ejecuta una vez al montar la página.
  //luego cada 5 segundos con setInterval
  useEffect(() => {
    async function consultar() {
      try {
        const mediciones = await obtenerMediciones();
        //se toman los datos desde el inicio hasta el mas receiente 
        setHistorial(mediciones.slice(0, LECTURAS).reverse());
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No se pudo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    }

    consultar(); // primera consulta al montar
    const intervalo = setInterval(consultar, INTERVALO_MS);

    // al salir de la página se detiene la consulta periódica
    return () => clearInterval(intervalo);
  }, []);

  const lecturaActual = historial.at(-1) ?? null;

  return { historial, lecturaActual, cargando, error };
}