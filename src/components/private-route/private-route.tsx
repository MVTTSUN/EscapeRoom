import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthStatus } from '../../store/auth-process/selectors';
import { AuthStatus, BrowserRoute } from '../../const';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const authStatus = useAppSelector(getAuthStatus);
  const { pathname, key } = useLocation();

  if (authStatus === AuthStatus.Auth && pathname !== BrowserRoute.Login) {
    return children;
  } else if (authStatus === AuthStatus.Auth && pathname === BrowserRoute.Login && key === 'default') {
    return <Navigate to={BrowserRoute.Main} replace />;
  } else if (authStatus !== AuthStatus.Auth && pathname !== BrowserRoute.Login) {
    return <Navigate to={BrowserRoute.Login} state={{ from: pathname }} replace />;
  } else {
    return children;
  }
}
