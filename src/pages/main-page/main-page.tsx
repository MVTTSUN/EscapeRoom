import { ChangeEvent, useState } from 'react';
import { LEVELS_QUESTS, TYPES_QUESTS } from '../../const';

export function MainPage() {
  const [typeQuest, setTypeQuest] = useState<string>(TYPES_QUESTS[0].id);
  const [levelQuest, setLevelQuest] = useState<string>(LEVELS_QUESTS[0].id);

  const onChangeTypeQuest = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeQuest(e.target.id);
  };

  const onChangeLevelQuest = (e: ChangeEvent<HTMLInputElement>) => {
    setLevelQuest(e.target.id);
  };

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
          <div className="quest-card">
            <div className="quest-card__img">
              <picture>
                <source type="image/webp" srcSet="img/content/crypt/crypt-size-s.webp, img/content/crypt/crypt-size-s@2x.webp 2x"/>
                <img src="img/content/crypt/crypt-size-s.jpg" srcSet="img/content/crypt/crypt-size-s@2x.jpg 2x" width="344" height="232" alt="Мужчина в клетке в подземелье."/>
              </picture>
            </div>
            <div className="quest-card__content">
              <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">Склеп</a>
              </div>
              <ul className="tags quest-card__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>2&ndash;5&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>Сложный
                </li>
              </ul>
            </div>
          </div>
          <div className="quest-card">
            <div className="quest-card__img">
              <picture>
                <source type="image/webp" srcSet="img/content/maniac/maniac-size-s.webp, img/content/maniac/maniac-size-s@2x.webp 2x"/>
                <img src="img/content/maniac/maniac-size-s.jpg" srcSet="img/content/maniac/maniac-size-s@2x.jpg 2x" width="344" height="232" alt="Мужчина в маске в тёмном переходе."/>
              </picture>
            </div>
            <div className="quest-card__content">
              <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">Маньяк</a>
              </div>
              <ul className="tags quest-card__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>3&ndash;6&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>Средний
                </li>
              </ul>
            </div>
          </div>
          <div className="quest-card">
            <div className="quest-card__img">
              <picture>
                <source type="image/webp" srcSet="img/content/ritual/ritual-size-s.webp, img/content/ritual/ritual-size-s@2x.webp 2x"/>
                <img src="img/content/ritual/ritual-size-s.jpg" srcSet="img/content/ritual/ritual-size-s@2x.jpg 2x" width="344" height="232" alt="Череп и горящая свеча в тёмном помещении."/>
              </picture>
            </div>
            <div className="quest-card__content">
              <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">Ритуал</a>
              </div>
              <ul className="tags quest-card__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>3&ndash;5&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>Лёгкий
                </li>
              </ul>
            </div>
          </div>
          <div className="quest-card">
            <div className="quest-card__img">
              <picture>
                <source type="image/webp" srcSet="img/content/ghosts/ghosts-size-s.webp, img/content/ghosts/ghosts-size-s@2x.webp 2x"/>
                <img src="img/content/ghosts/ghosts-size-s.jpg" srcSet="img/content/ghosts/ghosts-size-s@2x.jpg 2x" width="344" height="232" alt="Силует девушки за стеклом."/>
              </picture>
            </div>
            <div className="quest-card__content">
              <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">История призраков</a>
              </div>
              <ul className="tags quest-card__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>5&ndash;6&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>Лёгкий
                </li>
              </ul>
            </div>
          </div>
          <div className="quest-card">
            <div className="quest-card__img">
              <picture>
                <source type="image/webp" srcSet="img/content/palace/palace-size-s.webp, img/content/palace/palace-size-s@2x.webp 2x"/>
                <img src="img/content/palace/palace-size-s.jpg" srcSet="img/content/palace/palace-size-s@2x.jpg 2x" width="344" height="232" alt="Замок на возвышенности."/>
              </picture>
            </div>
            <div className="quest-card__content">
              <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">Тайны старого особняка</a>
              </div>
              <ul className="tags quest-card__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>2&ndash;3&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>Лёгкий
                </li>
              </ul>
            </div>
          </div>
          <div className="quest-card">
            <div className="quest-card__img">
              <picture>
                <source type="image/webp" srcSet="img/content/hut/hut-size-s.webp, img/content/hut/hut-size-s@2x.webp 2x"/>
                <img src="img/content/hut/hut-size-s.jpg" srcSet="img/content/hut/hut-size-s@2x.jpg 2x" width="344" height="232" alt="Череп животного в руках девушки."/>
              </picture>
            </div>
            <div className="quest-card__content">
              <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">Хижина в&nbsp;лесу</a>
              </div>
              <ul className="tags quest-card__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>4&ndash;7&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>Средний
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
