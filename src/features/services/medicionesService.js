//Aqui se maneja todo lo relacionado a como se reciben los datos
const API = 'http://localhost:8080';

// Convierte "2026-10-15T18:50:00.000+00:00" en hora y minuto,
// no se solicita segundos para el eje X
function formatearHora(fechahora) {
 return new Date(fechahora).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
// Pasa el objeto del backend al formato que ya usan los componentes
  //Eje x corregido
  function adaptarMedicion(dto) {
    return {
      hora: formatearHora(dto.fechahora),
      fecha: dto.fechahora, // fecha completa, la usa el eje de tiempo
      co2: dto.co2,
      temperatura: dto.temperatura,
      humedad: dto.humedad,
    };
  }
export async function obtenerMediciones(horas) {
    ////se recibe el get del back 
  const respuesta = await fetch(`${API}?horas=${horas}`);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al pedir las mediciones`);
  }
  //se maneja el arreglo recibido
  const datos = await respuesta.json();
  return datos.map(adaptarMedicion);
}

export async function obtenerUltLectura() {
  const respuesta = await fetch(`${API}/actual`);

  // tabla vacía: no es un error, simplemente no hay lectura todavía
  if (respuesta.status === 404) return null;

  if (!respuesta.ok) {
    throw new Error(`Error del servidor: ${respuesta.status}`);
  }

  return respuesta.json();
}

