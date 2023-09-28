const TYPES_QUESTS = [
  {
    id: 'all',
    iconLink: '#icon-all-quests',
    text: 'Все квесты',
  },
  {
    id: 'adventures',
    iconLink: '#icon-adventure',
    text: 'Приключения',
  },
  {
    id: 'horror',
    iconLink: '#icon-horror',
    text: 'Ужасы',
  },
  {
    id: 'mystic',
    iconLink: '#icon-mystic',
    text: 'Мистика',
  },
  {
    id: 'detective',
    iconLink: '#icon-detective',
    text: 'Детектив',
  },
  {
    id: 'sci-fi',
    iconLink: '#icon-sci-fi',
    text: 'Sci-fi',
  },
];

const LEVELS_QUESTS = [
  {
    id: 'any',
    text: 'Любой'
  },
  {
    id: 'easy',
    text: 'Лёгкий'
  },
  {
    id: 'medium',
    text: 'Средний'
  },
  {
    id: 'hard',
    text: 'Сложный'
  },
];

const AUTH_TOKEN_NAME = 'escape-room-token';

const BASE_URL = 'https://grading.design.pages.academy/v1/escape-room';

const REQUEST_TIMEOUT = 5000;

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSlice {
  Auth = 'AUTH',
  Quests = 'QUESTS',
}

enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Quest = '/quest',
}

enum BrowserRoute {
  Main = '/',
  Quest = '/quest',
  NotFound = '*',
}

export {
  TYPES_QUESTS,
  LEVELS_QUESTS,
  BASE_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_NAME,
  AuthStatus,
  NameSlice,
  APIRoute,
  BrowserRoute
};
