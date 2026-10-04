import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { Graficas } from '../features/components/componentes_r/Graficas/Graficas';
import { Lecturadatos } from '../features/components/componentes_r/Lecturadatos/Lecturadatos';
import { Calidadaire } from '../features/components/componentes_r/Calidadaire/Calidadaire';
import styles from './DashboardPage.module.css';

// Datos iniciales para que la interfaz cargue con contenido antes del primer mensaje
const DATOS_INICIALES = [
  { hora: '08:00', co2: 520,  temperatura: 24.1, humedad: 55 },
  { hora: '09:00', co2: 640,  temperatura: 24.8, humedad: 56 },
  { hora: '10:00', co2: 810,  temperatura: 25.6, humedad: 57 },
  { hora: '11:00', co2: 980,  temperatura: 26.3, humedad: 58 },
  { hora: '12:00', co2: 600,  temperatura: 27.0, humedad: 58 },
  { hora: '13:00', co2: 1320, temperatura: 27.4, humedad: 59 },
  { hora: '14:00', co2: 1700, temperatura: 27.2, humedad: 58 },
];

// Dirección del broker Mosquitto por WebSocket
const BROKER_URL = 'ws://localhost:9001'; 
const TOPIC_SUB = 'scd41/ambiente';

export function DashboardPage() {
  const [historial, setHistorial] = useState(DATOS_INICIALES);

  useEffect(() => {
    // 1. Establecer conexión con Mosquitto
    const client = mqtt.connect(BROKER_URL);

    client.on('connect', () => {
      console.log('Conectado a Mosquitto vía WebSockets');
      client.subscribe(TOPIC_SUB, (err) => {
        if (!err) {
          console.log(`Suscrito al tópico: ${TOPIC_SUB}`);
        }
      });
    });

    // 2. Escuchar mensajes del ESP32
    client.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());

        // Generar estampa de tiempo local (HH:MM:SS) para el eje X
        const ahora = new Date();
        const horaFormateada = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

        const nuevaLectura = {
          hora: horaFormateada,
          co2: Number(payload.co2),
          temperatura: Number(payload.temperatura),
          humedad: Number(payload.humedad),
        };

        // 3. Agregar la lectura y conservar un máximo de 10 puntos en pantalla
        setHistorial((prev) => {
          const actualizado = [...prev, nuevaLectura];
          return actualizado.length > 10 ? actualizado.slice(actualizado.length - 10) : actualizado;
        });
      } catch (err) {
        console.error('Error al procesar JSON de MQTT:', err);
      }
    });

    client.on('error', (err) => {
      console.error('Error en conexión MQTT:', err);
    });

    // Desconectar al desmontar la vista
    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, []);

  // La lectura actual siempre corresponde al último elemento del historial
  const lecturaActual = historial[historial.length - 1];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.titulo}>Inicio</h1>

      <Calidadaire co2={lecturaActual.co2} />

      <div className={styles.lecturas}>
        <Lecturadatos titulo="CO₂" valor={lecturaActual.co2} unidad="ppm" icono="pi pi-cloud" />
        <Lecturadatos titulo="Temperatura" valor={lecturaActual.temperatura} unidad="°C" icono="pi pi-sun" />
        <Lecturadatos titulo="Humedad" valor={lecturaActual.humedad} unidad="%" icono="pi pi-percentage" />
      </div>

      <Graficas
        titulo="Lecturas de CO₂"
        etiqueta="CO₂ (ppm)"
        historial={historial}
        campo="co2" 
      />
      <Graficas 
        titulo="Temperatura" 
        etiqueta="°C" 
        historial={historial} 
        campo="temperatura" 
      />
      <Graficas 
        titulo="Humedad" 
        etiqueta="% Porcentaje"   
        historial={historial} 
        campo="humedad" 
      />  
    </div>
  );
}