import styles from './Calidadaire.module.css';

const NIVELES = [
  {
    clave: 'excelente',
    max: 800,
    etiqueta: 'Excelente',
    descripcion: 'Aire limpio.',
    icono: 'pi pi-check-circle',
  },
  {
    clave: 'buena',
    max: 1200,
    etiqueta: 'Buena',
    descripcion: 'Calidad aceptable. Conviene ventilar.',
    icono: 'pi pi-info-circle',
  },
  {
    clave: 'mala',
    max: Infinity,
    etiqueta: 'Mala',
    descripcion: 'Alta concentración de CO₂. Se debe ventilar.',
    icono: 'pi pi-exclamation-triangle',
  },
];
//ordenado de mejor a peor
const ESCALA = [...NIVELES].reverse();

function obtenerNivel(co2) {
  //el nivel se toma de la variable max del arreglo NIVELES
  return NIVELES.find((nivel) => co2 <= nivel.max);
}
//se pasa al componente un objeto con todos los atributos de calidad de aire
export function Calidadaire({ co2 }) {
  const nivel = obtenerNivel(co2);

  return (
    <section className={`${styles.indicador} ${styles[nivel.clave]}`}>
      <div className={styles.cabecera}>
        <i className={`${nivel.icono} ${styles.icono}`} aria-hidden="true" />
        <div>
          <p className={styles.etiquetaSuperior}>Calidad del aire</p>
          <p className={styles.nivel}>{nivel.etiqueta}</p>
        </div>
      </div>

      <p className={styles.descripcion}>{nivel.descripcion}</p>

      <div className={styles.escala}>
        {ESCALA.map((segmento) => (
          <span
            key={segmento.clave}
            className={`${styles.segmento} ${styles[segmento.clave]} ${
              segmento.clave === nivel.clave ? styles.segmentoActivo : ''
            }`}
          >
            {segmento.etiqueta}
          </span>
        ))}
      </div>
    </section>
  );
}