import React, { useState } from 'react';
import { useReportes } from "../../../../hooks/useReportes";
import styles from './ReporteModal.module.css'; // Importamos los estilos dedicados
import {ResumenModal} from "../ResumenModal/ResumenModal";
import { useResumen } from "../../../../hooks/useResumen";
import * as XLSX from 'xlsx'; //  librería para exportar a Excel
export function ReporteModal({ isOpen, onClose }) {

  //Estados locales para las fechas (esto evita el error de que "desde" no está definido)
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  //Hooks personalizados
  // Estados de fecha
  const { data, cargando, error } = useReportes(desde, hasta);
  //consulta y obtiene el resumen de los datos o estadísticas
  const { resumen, cargando: cargandoResumen, error: errorResumen } = useResumen(desde, hasta);
// Función para exportar los datos actuales a un archivo .xlsx real
  const handleExportExcel = () => {
    if (!data || data.length === 0) return;

    // Creamos la hoja de cálculo y el libro con la librería xlsx
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Mediciones");

    // Descargamos el archivo con un nombre dinámico basado en las fechas
    XLSX.writeFile(workbook, `reporte_mediciones_${desde || 'inicio'}_al_${hasta || 'fin'}.xlsx`);
  };
  
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
          
        {desde && hasta && cargandoResumen && <p>Cargando resumen...</p>}
        {desde && hasta && errorResumen && <p className={styles.error}>Error: {errorResumen}</p>}
        <ResumenModal resumen={resumen} />

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
          {desde && hasta && cargando && <p>Cargando datos del reporte...</p>}
          
          {/* Mensaje de error */}
          {desde && hasta && error && <p className={styles.error}>Error: {error}</p>}
          


          {/* Mensaje de que no hay registros (SOLO se muestra si ya se eligieron fechas, no hay carga, no hay error y data viene vacía/nula) */}
          {desde && hasta && !cargando && !error && !data && (
            <p>No hay registros para este rango.</p>
          )}
        </div>
         {/* Botón para exportar a Excel (se habilita solo si hay datos para exportar) */}
          <div className={styles.modalFooter}>

        </div>
        <div className={styles.modalFooter}>
            {data && data.length > 0 && (
            <button onClick={handleExportExcel} className={styles.btnExportar}>
             Exportar a Excel
            </button>
          )}
          <button onClick={onClose} className={styles.btnCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}