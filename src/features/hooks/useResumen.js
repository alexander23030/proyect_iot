import { useEffect, useState } from 'react';
import { obtenerResumen } from '../services/medicionesService';

export function useResumen(desde, hasta) {
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // pide el resumen cada vez que cambian las fechas
  useEffect(() => {
    // sin las dos fechas no hay nada que mostrar
    if (!desde || !hasta) {
      setResumen(null);
      setError(null);
      return;
    }

    // evita que la respuesta tardía de un rango anterior pise la del rango actual
    let activo = true;

    async function cargar() {
      try {
        setCargando(true);
        setError(null);
        const datos = await obtenerResumen(desde, hasta);
        if (activo) setResumen(datos);
      } catch (err) {
        if (activo) {
          setError(err.message);
          setResumen(null);
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [desde, hasta]);

  return { resumen, cargando, error };
}