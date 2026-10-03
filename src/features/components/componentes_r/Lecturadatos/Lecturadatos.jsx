import styles from './Lecturadatos.module.css';

export function Lecturadatos({ titulo, valor, unidad, icono }) {
  return (
    <article className={styles.tarjeta}>
      <div className={styles.encabezado}>
        <i className={`${icono} ${styles.icono}`} aria-hidden="true" />
        <span className={styles.titulo}>{titulo}</span>
      </div>
      <p className={styles.valor}>
        {valor}
        <span className={styles.unidad}>{unidad}</span>
      </p>
    </article>
  );
}