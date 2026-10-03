import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
    {/*Link es el equivalente a routerLink */}
    {/*siempre Link en lugar de <a href> para navegar dentro de la app */}
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}