import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { Preloader } from '../preloader/preloader';
import { getIsLoading } from '../../store/quests-data/selectors';
import { useAppSelector } from '../../hooks/use-app-selector';
import { BrowserRoute } from '../../const';
import { QuestPage } from '../../pages/quest-page/quest-page';

export function App() {
  const isLoading = useAppSelector(getIsLoading);

  return (
    <>
      <Header />

      <Routes>
        <Route path={BrowserRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={`${BrowserRoute.Quest}/:id`} element={<QuestPage />} />
        </Route>
        <Route path={BrowserRoute.NotFound} element={<NotFoundPage />} />
      </Routes>

      <Footer />

      {isLoading && <Preloader />}
    </>
  );
}
