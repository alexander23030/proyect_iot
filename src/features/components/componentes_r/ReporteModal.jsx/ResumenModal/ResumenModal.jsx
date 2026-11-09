import styles from './ResumenModal.module.css';

// las claves coinciden con los nombres del JSON: co2Promedio, tempMax, humMin...
const TARJETAS = [
  { clave: 'co2', titulo: 'CO₂ promedio', unidad: 'ppm', icono: 'pi pi-cloud', decimales: 0 },
  { clave: 'temp', titulo: 'Temperatura', unidad: '°C', icono: 'pi pi-sun', decimales: 1 },
  { clave: 'hum', titulo: 'Humedad media', unidad: '%', icono: 'pi pi-percentage', decimales: 1 },
];

// redondea al mostrar; un valor nulo (rango sin datos) se muestra como guion
function formatear(valor, decimales) {
  if (valor == null) return '—';
  return Number(valor).toLocaleString('es-MX', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

// resumen: objeto que devuelve obtenerResumen (o null mientras no se ha generado)
export function ResumenModal({ resumen }) {
  if (!resumen) return null;

  if (resumen.total === 0) {
    return <p>No hay mediciones en este periodo.</p>;
  }

  return (
    <section className={styles.resumen}>
      <p className={styles.subtitulo}>
        Estadísticas calculadas a partir de las mediciones registradas
      </p>

      <div className={styles.tarjetas}>
        {TARJETAS.map((tarjeta) => (
          <article key={tarjeta.clave} className={styles.tarjeta}>
            <div className={styles.encabezado}>
              <i className={tarjeta.icono} />
              <span>{tarjeta.titulo}</span>
            </div>
            <p className={styles.valor}>
              {formatear(resumen[`${tarjeta.clave}Promedio`], tarjeta.decimales)}
              <span className={styles.unidad}> {tarjeta.unidad}</span>
            </p>
            <p className={styles.detalle}>
              Máx. {formatear(resumen[`${tarjeta.clave}Max`], tarjeta.decimales)} · Mín.{' '}
              {formatear(resumen[`${tarjeta.clave}Min`], tarjeta.decimales)}
            </p>
          </article>
        ))}

        <article className={styles.tarjeta}>
          <div className={styles.encabezado}>
            <i className="pi pi-database" />
            <span>Mediciones</span>
          </div>
          <p className={styles.valor}>{formatear(resumen.total, 0)}</p>
          <p className={styles.detalle}>Registros del periodo</p>
        </article>
      </div>
    </section>
  );
}