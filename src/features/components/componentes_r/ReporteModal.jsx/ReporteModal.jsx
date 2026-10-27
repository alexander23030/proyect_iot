import React, { useState } from 'react';
import { useReportes } from '../../../hooks/useReportes';
import styles from './ReporteModal.module.css'; // Importamos los estilos dedicados

export function ReporteModal({ isOpen, onClose }) {
  // 1. Estados locales para las fechas (esto evita el error de que "desde" no está definido)
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  // 2. Llamamos al hook pasándole los estados de fecha
  const { data, loading, error } = useReportes(desde, hasta);

  // 3. Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;


  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Reporte de Mediciones</h3>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.filters}>
            <label>
              Desde: 
              <input type="datetime-local" value={desde} onChange={(e) => setDesde(e.target.value)} />
            </label>
            <label>
              Hasta: 
              <input type="datetime-local" value={hasta} onChange={(e) => setHasta(e.target.value)} />
            </label>
          </div>

          {/* Mensaje inicial cuando aún no se seleccionan fechas */}
          {(!desde || !hasta) && (
            <p className={styles.infoMsg}>Selecciona un rango de fechas para consultar el reporte.</p>
          )}

          {/* Indicador de carga */}
          {desde && hasta && loading && <p>Cargando datos del reporte...</p>}
          
          {/* Mensaje de error */}
          {desde && hasta && error && <p className={styles.error}>Error: {error}</p>}
          
          {/* Datos encontrados */}
          {desde && hasta && !loading && !error && data && (
            <div className={styles.reportData}>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          {/* Mensaje de que no hay registros (SOLO se muestra si ya se eligieron fechas, no hay carga, no hay error y data viene vacía/nula) */}
          {desde && hasta && !loading && !error && !data && (
            <p>No hay registros para este rango.</p>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.btnCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}