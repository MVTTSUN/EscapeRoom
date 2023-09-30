import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthStatus, BrowserRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthStatus } from '../../store/auth-process/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { logoutAction } from '../../store/api-actions';

export function Header() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const authStatus = useAppSelector(getAuthStatus);

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        {pathname === '/' ? (
          <span className="logo header__logo">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span>
        ) : (
          <Link className="logo header__logo" to={BrowserRoute.Main} aria-label="Перейти на Главную">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </Link>
        )}
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink end className={({ isActive }) => (isActive ? 'link active' : 'link')} to={BrowserRoute.Main}>Квесты</NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink end className={({ isActive }) => (isActive ? 'link active' : 'link')} to={BrowserRoute.Contacts}>Контакты</NavLink>
            </li>
            {authStatus === AuthStatus.Auth && (
              <li className="main-nav__item">
                <NavLink end className={({ isActive }) => (isActive ? 'link active' : 'link')} to={BrowserRoute.MyQuests}>Мои бронирования</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="header__side-nav">
          {pathname !== BrowserRoute.Login && (authStatus !== AuthStatus.Auth
            ? (<Link className="btn header__side-item header__login-btn" to={BrowserRoute.Login}>Вход</Link>)
            : (<button onClick={logout} className="btn btn--accent header__side-item">Выйти</button>))}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}
