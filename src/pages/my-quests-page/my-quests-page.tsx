import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getMyQuests } from '../../store/quests-data/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { deleteMyQuestAction, getMyQuestsAction } from '../../store/api-actions';

export function MyQuestsPage() {
  const myQuests = useAppSelector(getMyQuests);
  const dispatch = useAppDispatch();

  const deleteQuest = (id: string) => {
    dispatch(deleteMyQuestAction(id));
    dispatch(getMyQuestsAction());
  };

  useEffect(() => {
    dispatch(getMyQuestsAction());
  }, []);

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
          <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </div>
        <div className="cards-grid">
          {myQuests.map((myQuest) => (
            <div key={myQuest.id} className="quest-card">
              <div className="quest-card__img">
                <picture>
                  <source type="image/webp" srcSet={myQuest.quest.previewImgWebp}/>
                  <img src={myQuest.quest.previewImg} width="344" height="232" alt={myQuest.quest.title}/>
                </picture>
              </div>
              <div className="quest-card__content">
                <div className="quest-card__info-wrapper">
                  <a className="quest-card__link" href="quest.html">{myQuest.quest.title}</a>
                  <span className="quest-card__info">
                    [{myQuest.date === 'today' ? 'сегодня' : 'завтра'},&nbsp;{myQuest.time}. {myQuest.location.address}]
                  </span>
                </div>
                <ul className="tags quest-card__tags">
                  <li className="tags__item">
                    <svg width="11" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-person"></use>
                    </svg>{myQuest.peopleCount}&nbsp;чел
                  </li>
                  <li className="tags__item">
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-level"></use>
                    </svg>{myQuest.quest.level}
                  </li>
                </ul>
                <button onClick={() => deleteQuest(myQuest.id)} className="btn btn--accent btn--secondary quest-card__btn" type="button">Отменить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
