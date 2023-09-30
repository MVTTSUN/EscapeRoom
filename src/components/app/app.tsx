import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { Preloader } from '../preloader/preloader';
import { getIsLoading } from '../../store/quests-data/selectors';
import { useAppSelector } from '../../hooks/use-app-selector';
import { AuthStatus, BrowserRoute } from '../../const';
import { QuestPage } from '../../pages/quest-page/quest-page';
import { ContactsPage } from '../../pages/contacts-page/contacts-page';
import { BookingPage } from '../../pages/booking-page/booking-page';
import { PrivateRoute } from '../private-route/private-route';
import { LoginPage } from '../../pages/login-page/login-page';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { MyQuestsPage } from '../../pages/my-quests-page/my-quests-page';
import { checkAuthAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/auth-process/selectors';

export function App() {
  const isLoading = useAppSelector(getIsLoading);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(checkAuthAction());
    }
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path={BrowserRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={`${BrowserRoute.Quest}/:id`}>
            <Route index element={<QuestPage />} />
            <Route path={`${BrowserRoute.Quest}/:id${BrowserRoute.Booking}`} element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          </Route>
          <Route path={BrowserRoute.Login} element={<PrivateRoute><LoginPage /></PrivateRoute>} />
          <Route path={BrowserRoute.Contacts} element={<ContactsPage />} />
          <Route path={BrowserRoute.MyQuests} element={<PrivateRoute><MyQuestsPage /></PrivateRoute>} />
        </Route>
        <Route path={BrowserRoute.NotFound} element={<NotFoundPage />} />
      </Routes>

      <Footer />

      {isLoading && <Preloader />}
    </>
  );
}
