import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCurrentQuest } from '../../store/quests-data/selectors';
import { getQuestAction } from '../../store/api-actions';
import { resetCurrentQuest } from '../../store/quests-data/quests-data';
import { BrowserRoute } from '../../const';

export function QuestPage() {
  const dispatch = useAppDispatch();
  const currentQuest = useAppSelector(getCurrentQuest);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getQuestAction(id));
    }

    return () => {
      dispatch(resetCurrentQuest());
    };
  }, []);

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={currentQuest.coverImgWebp ? currentQuest.coverImgWebp : ''}/>
          <img src={currentQuest.coverImg} width="1366" height="768" alt=""/>
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{currentQuest.title}</h1>
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{currentQuest.type}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>{currentQuest.peopleMinMax && currentQuest.peopleMinMax[0]}&ndash;{currentQuest.peopleMinMax && currentQuest.peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>{currentQuest.level}
            </li>
          </ul>
          <p className="quest-page__description">{currentQuest.description}</p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={`${BrowserRoute.Quest}/${id !== undefined ? id : ''}${BrowserRoute.Booking}`}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}
