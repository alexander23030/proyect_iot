import { useEffect, useState } from 'react';
import { getReporte } from '../services/medicionesService';

export function useReportes(desde, hasta) {
      //Variables de estados
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    // Si no hay fechas definidas todavía, no hacemos el fetch
    if (!desde || !hasta) {
      setCargando(false);
      return;
    }

    async function cargarDatos() {
      try {
        setCargando(true);
        setError(null);
        
        // Llamamos a tu función pasándole los parámetros necesarios
        const resultado = await getReporte(desde, hasta);
        setData(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, [desde, hasta]); // Se vuelve a ejecutar automáticamente si cambian las fechas

  return { data, cargando, error };
}