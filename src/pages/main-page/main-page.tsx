import { ChangeEvent, useEffect } from 'react';
import { BrowserRoute, LEVELS_QUESTS, TYPES_QUESTS } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getQuestsAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilteredQuests, getLevelQuest, getTypeQuest } from '../../store/quests-data/selectors';
import { Link } from 'react-router-dom';
import { resetTypeAndLevel, setLevelQuest, setTypeQuest } from '../../store/quests-data/quests-data';

export function MainPage() {
  const dispatch = useAppDispatch();
  const typeQuest = useAppSelector(getTypeQuest);
  const levelQuest = useAppSelector(getLevelQuest);
  const filteredQuests = useAppSelector(getFilteredQuests);

  const onChangeTypeQuest = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTypeQuest(e.target.id));
  };

  const onChangeLevelQuest = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLevelQuest(e.target.id));
  };

  useEffect(() => {
    dispatch(getQuestsAction());

    return () => {
      dispatch(resetTypeAndLevel());
    };
  }, []);

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <fieldset className="filter__section">
              <legend className="visually-hidden">Тематика</legend>
              <ul className="filter__list">
                {TYPES_QUESTS.map((type) => (
                  <li key={type.id} className="filter__item">
                    <input onChange={onChangeTypeQuest} type="radio" name="type" id={type.id} checked={type.id === typeQuest} />
                    <label className="filter__label" htmlFor={type.id}>
                      <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                        <use xlinkHref={type.iconLink}></use>
                      </svg><span className="filter__label-text">{type.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <fieldset className="filter__section">
              <legend className="visually-hidden">Сложность</legend>
              <ul className="filter__list">
                {LEVELS_QUESTS.map((level) => (
                  <li key={level.id} className="filter__item">
                    <input onChange={onChangeLevelQuest} type="radio" name="level" id={level.id} checked={level.id === levelQuest} />
                    <label className="filter__label" htmlFor={level.id}><span className="filter__label-text">{level.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <div className="cards-grid">
          {filteredQuests.map((quest) => (
            <div key={quest.id} className="quest-card">
              <div className="quest-card__img">
                <picture>
                  <source type="image/webp" srcSet={quest.previewImgWebp}/>
                  <img src={quest.previewImg} width="344" height="232" alt={quest.title}/>
                </picture>
              </div>
              <div className="quest-card__content">
                <div className="quest-card__info-wrapper">
                  <Link className="quest-card__link" to={`${BrowserRoute.Quest}/${quest.id}`}>{quest.title}</Link>
                </div>
                <ul className="tags quest-card__tags">
                  <li className="tags__item">
                    <svg width="11" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-person"></use>
                    </svg>{quest.peopleMinMax[0]}&ndash;{quest.peopleMinMax[1]}&nbsp;чел
                  </li>
                  <li className="tags__item">
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-level"></use>
                    </svg>{quest.level}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
