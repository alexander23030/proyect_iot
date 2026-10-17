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
// Pasa el objeto del backend al formato que ya usan tus componentes
function adaptarMedicion(dto) {
  return {
    hora: formatearHora(dto.fechahora),
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