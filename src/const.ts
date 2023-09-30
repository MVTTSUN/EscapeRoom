import { BaseIconOptions } from 'leaflet';

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

const POSITION_CONTACTS_MAP: [number, number] = [59.968322, 30.317359];

const DEFAULT_MARKER_ICON: BaseIconOptions = {
  iconAnchor: [15, 45],
  iconSize: [30, 45],
  iconUrl: 'img/svg/pin-default.svg',
};

const ACTIVE_MARKER_ICON: BaseIconOptions = {
  iconAnchor: [15, 45],
  iconSize: [30, 45],
  iconUrl: 'img/svg/pin-active.svg',
};

const LAYER_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

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
  Booking = '/booking',
  MyQuests = '/reservation'
}

enum BrowserRoute {
  Main = '/',
  Quest = '/quest',
  MyQuests = '/my-quests',
  Login = '/login',
  Contacts = '/contacts',
  Booking = '/booking',
  NotFound = '*',
}

enum ErrorsForm {
  Required = 'Поле обязательно для заполнения',
  Agreement = 'Необходимо дать согласие на обработку персональных данных',
  MinThreeWords = 'Минимальное количество символов - 3',
  MaxFifteenWords = 'Минимальное количество символов - 15',
  Password = 'Пароль должен содержать буквы и цифры',
  Email = 'Неправильный формат электронной почты',
  Tel = 'Неправильный формат телефона',
  PersonMin = 'Минимальное количество человек - ',
  PersonMax = 'Максимальное количество человек - ',
}

enum InputName {
  Email = 'email',
  Password = 'password',
  Agreement = 'agreement',
  Date = 'date',
  Name = 'name',
  Tel = 'tel',
  Person = 'person',
  Children = 'children',
}

export {
  TYPES_QUESTS,
  LEVELS_QUESTS,
  BASE_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_NAME,
  POSITION_CONTACTS_MAP,
  DEFAULT_MARKER_ICON,
  ACTIVE_MARKER_ICON,
  LAYER_MAP,
  AuthStatus,
  NameSlice,
  APIRoute,
  BrowserRoute,
  ErrorsForm,
  InputName
};
