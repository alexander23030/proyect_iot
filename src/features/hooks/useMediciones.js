import { useEffect, useState } from 'react';
import { obtenerMediciones } from '../services/medicionesService';

const INTERVALO_MS = 5000; // cada cuántos ms se consulta el backend

export function useMediciones(horas) {

  //Variables de estados
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // se ejecuta al montar y cada vez que cambia `horas`
  useEffect(() => {
    // evita que una respuesta tardía de un rango anterior pise la actual
    let activo = true;

    async function consultar() {
      try {
        const mediciones = await obtenerMediciones(horas);
        if (!activo) return;
        // el backend las entrega de la más antigua a la más reciente
        setHistorial(mediciones);
        setError(null);
      } catch (err) {
        console.error(err);
        if (activo) setError('No se pudo conectar con el servidor.');
      } finally {
        if (activo) setCargando(false);
      }
    }

    //Actualizar en intervalo definiido
    consultar();
    const intervalo = setInterval(consultar, INTERVALO_MS);

    // al cambiar `horas` o salir de la página se limpia el intervalo anterior
    return () => {
      activo = false;
      clearInterval(intervalo);
    };
  }, [horas]);


  return { historial, cargando, error };
}