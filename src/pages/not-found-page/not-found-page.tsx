import { Link } from 'react-router-dom';
import { BrowserRoute } from '../../const';

export function NotFoundPage() {
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--size-m page-content__title">404 Not Found</h1>
        <Link className="link" to={BrowserRoute.Main}>На главную</Link>
      </div>
    </main>
  );
}
