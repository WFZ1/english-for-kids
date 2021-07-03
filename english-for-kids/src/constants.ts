export const APP_PAGE_CHANGE = 'app/pageChange';

export const GAME_MODE_CHANGE = 'game/modeChange';

export const GAME_START = 'game/start';

export const GAME_END = 'game/end';

export const GAME_CARD_CORRECT = 'game/cardCorrect';

export const GAME_CARD_ERROR = 'game/cardError';

export const INITIAL_STATE = {
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
  countErrors: 0
};

export const TRAIN = 'train';

export const PLAY = 'play';

export const APP_PAGES = {
  home: '',
  category: 'category',
  statistic: 'statistic'
}

export const MY_GITHUB = {
  url: 'https://github.com/WFZ1',
  name: 'WFZ1'
}

export const RSSCHOOL_JS_LINK = 'https://rs.school/js/';

export const YEAR_CREATE_APP = '\'21';

export const PERCENT_100 = 100;

export const HAMB_MENU_OPEN_CLASS = 'hamburger-menu-opened';

export const NAV_ITEM_ACTIVE_CLASS = 'nav-drawer__link_active'

export const CARD_FLIP_CLASS = 'word-card_flipped';

export const CARD_FLIP_DURATION = 250;

export const BTN_START_GAME_TEXT = 'Start game';

export const GAME_CARDS_SOUND_NOTICES = {
  correct: {
    folder: 'notices',
    audio: 'correct.mp3'
  },
  error: {
    folder: 'notices',
    audio: 'error.mp3'
  }
}

export const GAME_END_SPLASH_SCREEN = {
  success: {
    text: 'Congratulations! You win!',
    image: 'assets/images/game-end-state/success.jpg',
    audio: 'assets/audio/notices/success.mp3'
  },
  fail: {
    text: 'Errors',
    image: 'assets/images/game-end-state/failure.jpg',
    audio: 'assets/audio/notices/failure.mp3'
  }
}

export const CATEGORY_CARDS = [
  {
    handle: 'action-set-a',
    title: 'Action (set A)',
    image: 'dance.jpg',
    alt: 'Dance',
  },
  {
    handle: 'action-set-b',
    title: 'Action (set B)',
    image: 'swim.jpg',
    alt: 'Swim',
  },
  {
    handle: 'animal-set-a',
    title: 'Animal (set A)',
    image: 'cat.jpg',
    alt: 'Cat',
  },
  {
    handle: 'animal-set-b',
    title: 'Animal (set B)',
    image: 'bird.jpg',
    alt: 'Bird',
  },
  {
    handle: 'clothes',
    title: 'Clothes',
    image: 'blouse.jpg',
    alt: 'Blouse',
  },
  {
    handle: 'emotions',
    title: 'Emotions',
    image: 'smile.jpg',
    alt: 'Smile',
  },
  {
    handle: 'work',
    title: 'Work',
    image: 'badly-paid.png',
    alt: 'Badly paid',
  },
  {
    handle: 'professions',
    title: 'Professions',
    image: 'programmer.png',
    alt: 'Programmer',
  },
];

export const WORD_CARDS = [
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'cry.jpg',
      audio: 'cry.mp3'
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'dance.jpg',
      audio: 'dance.mp3'
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'dive.jpg',
      audio: 'dive.mp3'
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'draw.jpg',
      audio: 'draw.mp3'
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'fish.jpg',
      audio: 'fish.mp3'
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'fly.jpg',
      audio: 'fly.mp3'
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'hug.jpg',
      audio: 'hug.mp3'
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'jump.jpg',
      audio: 'jump.mp3'
    }
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'open.jpg',
      audio: 'open.mp3'
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'play.jpg',
      audio: 'play.mp3'
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'point.jpg',
      audio: 'point.mp3'
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'ride.jpg',
      audio: 'ride.mp3'
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'run.jpg',
      audio: 'run.mp3'
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'sing.jpg',
      audio: 'sing.mp3'
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'skip.jpg',
      audio: 'skip.mp3'
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'swim.jpg',
      audio: 'swim.mp3'
    }
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'cat.jpg',
      audio: 'cat.mp3'
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'chick.jpg',
      audio: 'chick.mp3'
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'chicken.jpg',
      audio: 'chicken.mp3'
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'dog.jpg',
      audio: 'dog.mp3'
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'horse.jpg',
      audio: 'horse.mp3'
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'pig.jpg',
      audio: 'pig.mp3'
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'rabbit.jpg',
      audio: 'rabbit.mp3'
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'sheep.jpg',
      audio: 'sheep.mp3'
    }
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'bird.jpg',
      audio: 'bird.mp3'
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'fish1.jpg',
      audio: 'fish.mp3'
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'frog.jpg',
      audio: 'frog.mp3'
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'giraffe.jpg',
      audio: 'giraffe.mp3'
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'lion.jpg',
      audio: 'lion.mp3'
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'mouse.jpg',
      audio: 'mouse.mp3'
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'turtle.jpg',
      audio: 'turtle.mp3'
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'dolphin.jpg',
      audio: 'dolphin.mp3'
    }
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'skirt.jpg',
      audio: 'skirt.mp3'
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'pants.jpg',
      audio: 'pants.mp3'
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'blouse.jpg',
      audio: 'blouse.mp3'
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'dress.jpg',
      audio: 'dress.mp3'
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'boot.jpg',
      audio: 'boot.mp3'
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'shirt.jpg',
      audio: 'shirt.mp3'
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'coat.jpg',
      audio: 'coat.mp3'
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'shoe.jpg',
      audio: 'shoe.mp3'
    }
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'sad.jpg',
      audio: 'sad.mp3'
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'angry.jpg',
      audio: 'angry.mp3'
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'happy.jpg',
      audio: 'happy.mp3'
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'tired.jpg',
      audio: 'tired.mp3'
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'surprised.jpg',
      audio: 'surprised.mp3'
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'scared.jpg',
      audio: 'scared.mp3'
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'smile.jpg',
      audio: 'smile.mp3'
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'laugh.jpg',
      audio: 'laugh.mp3'
    }
  ],
  [
    {
      word: 'home office',
      translation: 'домашний офис',
      image: 'home-office.png',
      audio: 'home-office.mp3',
    },
    {
      word: 'earn money',
      translation: 'зарабатывать деньги',
      image: 'earn-money.png',
      audio: 'earn-money.mp3',
    },
    {
      word: 'badly paid',
      translation: 'плохо оплачиваемый',
      image: 'badly-paid.png',
      audio: 'badly-paid.mp3',
    },
    {
      word: 'well-paid',
      translation: 'хорошо оплачиваемый',
      image: 'well-paid.png',
      audio: 'well-paid.mp3',
    },
    {
      word: 'to be fired',
      translation: 'быть уволенным',
      image: 'to-be-fired.png',
      audio: 'to-be-fired.mp3',
    },
    {
      word: 'colleague',
      translation: 'коллега',
      image: 'colleague.png',
      audio: 'colleague.mp3',
    },
    {
      word: 'vacation',
      translation: 'отпуск',
      image: 'vacation.png',
      audio: 'vacation.mp3',
    },
    {
      word: 'day off',
      translation: 'выходной',
      image: 'day-off.png',
      audio: 'day-off.mp3',
    },
  ],
  [
    {
      word: 'stewardess',
      translation: 'стюардесса',
      image: 'stewardess.png',
      audio: 'stewardess.mp3',
    },
    {
      word: 'programmer',
      translation: 'программист',
      image: 'programmer.png',
      audio: 'programmer.mp3',
    },
    {
      word: 'nurse',
      translation: 'медсестра/медбрат',
      image: 'nurse.png',
      audio: 'nurse.mp3',
    },
    {
      word: 'teacher',
      translation: 'учитель',
      image: 'teacher.png',
      audio: 'teacher.mp3',
    },
    {
      word: 'designer',
      translation: 'дизайнер',
      image: 'designer.png',
      audio: 'designer.mp3',
    },
    {
      word: 'hairdresser',
      translation: 'парикмахер',
      image: 'hairdresser.png',
      audio: 'hairdresser.mp3',
    },
    {
      word: 'cashier',
      translation: 'кассир',
      image: 'cashier.png',
      audio: 'cashier.mp3',
    },
    {
      word: 'tour guide',
      translation: 'гид',
      image: 'tour-guide.png',
      audio: 'tour-guide.mp3',
    },
  ]
];

export const NAV_ITEMS = [
  {
    text: 'Main Page',
    url: '',
  }
];

CATEGORY_CARDS.forEach((category) => {
  NAV_ITEMS.push({
    text: category.title,
    url: `category/${ category.handle }`
  });
});

NAV_ITEMS.push({
  text: 'Statistic Page',
  url: 'statistic',
});

export const STATISTIC_TABLE_TITLES = [
  'Category',
  'Word',
  'Translation',
  'Trained',
  'Correct',
  'Wrong',
  'Hit %'
];

export const EMPTY_STATISTICAL_DATA = {
  trained: 0,
  correct: 0,
  wrong: 0
}
