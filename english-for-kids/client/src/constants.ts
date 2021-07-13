export const APP_AUTHORIZATION = 'app/authorization';

export const APP_PAGE_CHANGE = 'app/pageChange';

export const GAME_MODE_CHANGE = 'game/modeChange';

export const GAME_START = 'game/start';

export const GAME_END = 'game/end';

export const GAME_CARD_CORRECT = 'game/cardCorrect';

export const GAME_CARD_ERROR = 'game/cardError';

export const APP_DIFFICULT_CATEGORY = 'app/difficultCategory';

export const INITIAL_STATE = {
  isAdmin: false,
  isLogInOutDone: false,
  currentPage: '',
  gameMode: 'train',
  category: '',
  currentCardIndex: 0,
  isPageChange: false,
  isGameStart: false,
  isEndGame: false,
  randomCards: [],
  isCardCorrect: false,
  isCardError: false,
  countErrors: 0,
  difficultWords: [],
};

export const TRAIN = 'train';

export const PLAY = 'play';

export const APP_PAGES = {
  home: '',
  category: 'category',
  statistic: 'statistic',
  adminHome: 'admin',
  adminCategory: 'admin/category'
};

export const MY_GITHUB = {
  url: 'https://github.com/WFZ1',
  name: 'WFZ1',
};

export const RSSCHOOL_JS_LINK = 'https://rs.school/js/';

export const YEAR_CREATE_APP = "'21";

export const PERCENT_100 = 100;

export const HAMB_MENU_OPEN_CLASS = 'hamburger-menu-opened';

export const NAV_ITEM_ACTIVE_CLASS = 'nav-drawer__link_active';

export const CARD_FLIP_CLASS = 'word-card_flipped';

export const CARD_FLIP_DURATION = 250;

export const BTN_START_GAME_TEXT = 'Start game';

export const BTN_REPEAT_DIFFICULT_WORDS_TEXT = 'Repeat difficult words';

export const BTN_RESET_STATISTIC_TEXT = 'Reset';

export const MAX_DIFFICULT_WORDS = 8;

export const DIFFICULT_WORDS_ACCURACY_TEXT = 'Words with < 45% accuracy';

export const DIFFICULT_WORDS_ACCURACY_LIMIT = 45;

export const STATISTIC_CELL_SORT_CLASSES = {
  descend: 'statistic-table-cell_sort_descend',
  ascend: 'statistic-table-cell_sort_ascend',
};

export const GAME_CARDS_SOUND_NOTICES = {
  correct: {
    folder: 'notices',
    audio: 'correct.mp3',
  },
  error: {
    folder: 'notices',
    audio: 'error.mp3',
  },
};

export const GAME_END_SPLASH_SCREEN = {
  success: {
    text: 'Congratulations! You win!',
    image: 'assets/images/game-end-state/success.jpg',
    audio: 'assets/audio/notices/success.mp3',
  },
  fail: {
    text: 'Errors',
    image: 'assets/images/game-end-state/failure.jpg',
    audio: 'assets/audio/notices/failure.mp3',
  },
};

export const ADMIN_NAV_ITEMS = [
  {
    text: 'Categories',
    url: 'admin/categories'
  },
  {
    text: 'Words',
    url: 'admin/words'
  }
];

export const STATISTIC_TABLE_TITLES = [
  'Category',
  'Word',
  'Translation',
  'Trained',
  'Correct',
  'Wrong',
  'Hit %',
];

export const EMPTY_STATISTICAL_DATA = {
  trained: 0,
  correct: 0,
  wrong: 0,
};

export const STATISTIC_PAGE_URL = 'repeat-difficult-words';

export const LOGIN_POPUP_SHOW_CLASS = 'login-popup-show';

export const LOGIN_FORM_USERNAME_FIELD = {
  type: 'text',
  name: 'username',
  placeholder: 'username',
  maxlength: '30'
};

export const LOGIN_FORM_PASSWORD_FIELD = {
  type: 'password',
  name: 'password',
  placeholder: 'password',
  maxlength: '30'
};

export const LOGIN_BTN_TEXT = 'Login';
export const LOGOUT_BTN_TEXT = 'Log out';

export const LOGIN_FORM_CANCEL_BTN = {
  text: 'Cancel',
  type: 'reset'
};

export const LOGIN_FORM_SUBMIT_BTN = {
  text: 'Login',
  type: 'submit'
};

export const SERVER_URL = 'http://localhost:7000';

export const SERVER_API_CATEGORY_IMAGE_URL = `${ SERVER_URL }/api/category-image`;

export const SERVER_API_CATEGORIES_URL = `${ SERVER_URL }/api/categories`;

export const SERVER_API_WORDS_URL = `${ SERVER_URL }/api/words`;

export const SERVER_API_NAV_ITEMS_URL = `${ SERVER_URL }/api/nav-items`;
