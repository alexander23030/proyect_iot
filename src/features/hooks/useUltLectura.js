import { useEffect, useState } from 'react';
import { obtenerUltLectura } from '../services/medicionesService';

const INTERVALO_MS= 5000 // tiempo MS consulta backend

export function useUltLectura() {    

    //Variables de estados y lectura de datos
    const [lecturaActual, setLecturaActual] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

  // consulta la última lectura al montar y la actualiza periódicamente
  // no depende del filtro de las gráficas
     useEffect(() => {
    async function consultar() {
      try {
        setLecturaActual(await obtenerUltLectura());
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No se pudo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    }

    //Obliga a hacer la primera consulta sin esperar al intervalo
    //luego se programa el intervalo
    consultar();
    const intervalo = setInterval(consultar, INTERVALO_MS);

    // detener la actualizacion
    return () => clearInterval(intervalo);
  }, []);

  //envio de datos al dash
  return { lecturaActual, cargando, error };

}