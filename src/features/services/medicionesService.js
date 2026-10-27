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

  //ger de todos los datos dentro de una escala
  // de horas determinada (6,12,24,96) con la funcion adaptar mediciones
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


//get al ultimo dato para los indicadores
export async function obtenerUltLectura() {
  const respuesta = await fetch(`${API}/actual`);
  //validacion errores (tabla vacia)
  if (respuesta.status === 404) return null;

  if (!respuesta.ok) {
    throw new Error(`Error del servidor: ${respuesta.status}`);
  }
  return respuesta.json();
}

//get a determinados rangos de fechas
export async function getReporte(desde, hasta ){
  //URLSearchParams facilita la
  // modificacion de query parameters que se mandan en una URL
  const parametros =  new URLSearchParams({ desde, hasta });
  const respuesta = await fetch(`/reportes?${parametros}`);
  //validacion errores (tabla vacia)
    if (respuesta.status === 404) return null;

  if (!respuesta.ok) {
    throw new Error(`Error del servidor: ${respuesta.status}`);
  }
  return respuesta.json();
}


