import ICategoriesProps from '../types/categories-props.type';
import { WORDS_AUDIOS_PATH, WORDS_IMAGES_PATH } from './constants';
import { CATEGORIES_CARDS } from './categories-cards';

export const WORDS_CARDS = [
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: `${WORDS_IMAGES_PATH}/action-set-a/cry.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/cry.mp3`,
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: `${WORDS_IMAGES_PATH}/action-set-a/dance.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/dance.mp3`,
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: `${WORDS_IMAGES_PATH}/action-set-a/dive.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/dive.mp3`,
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: `${WORDS_IMAGES_PATH}/action-set-a/draw.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/draw.mp3`,
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: `${WORDS_IMAGES_PATH}/action-set-a/fish.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/fish.mp3`,
    },
    {
      word: 'fly',
      translation: 'летать',
      image: `${WORDS_IMAGES_PATH}/action-set-a/fly.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/fly.mp3`,
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: `${WORDS_IMAGES_PATH}/action-set-a/hug.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/hug.mp3`,
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: `${WORDS_IMAGES_PATH}/action-set-a/jump.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-a/jump.mp3`,
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: `${WORDS_IMAGES_PATH}/action-set-b/open.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/open.mp3`,
    },
    {
      word: 'play',
      translation: 'играть',
      image: `${WORDS_IMAGES_PATH}/action-set-b/play.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/play.mp3`,
    },
    {
      word: 'point',
      translation: 'указывать',
      image: `${WORDS_IMAGES_PATH}/action-set-b/point.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/point.mp3`,
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: `${WORDS_IMAGES_PATH}/action-set-b/ride.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/ride.mp3`,
    },
    {
      word: 'run',
      translation: 'бегать',
      image: `${WORDS_IMAGES_PATH}/action-set-b/run.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/run.mp3`,
    },
    {
      word: 'sing',
      translation: 'петь',
      image: `${WORDS_IMAGES_PATH}/action-set-b/sing.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/sing.mp3`,
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: `${WORDS_IMAGES_PATH}/action-set-b/skip.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/skip.mp3`,
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: `${WORDS_IMAGES_PATH}/action-set-b/swim.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/action-set-b/swim.mp3`,
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/cat.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/cat.mp3`,
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/chick.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/chick.mp3`,
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/chicken.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/chicken.mp3`,
    },
    {
      word: 'dog',
      translation: 'собака',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/dog.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/dog.mp3`,
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/horse.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/horse.mp3`,
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/pig.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/pig.mp3`,
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/rabbit.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/rabbit.mp3`,
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: `${WORDS_IMAGES_PATH}/animal-set-a/sheep.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-a/sheep.mp3`,
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/bird.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/bird.mp3`,
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/fish1.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/fish.mp3`,
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/frog.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/frog.mp3`,
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/giraffe.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/giraffe.mp3`,
    },
    {
      word: 'lion',
      translation: 'лев',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/lion.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/lion.mp3`,
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/mouse.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/mouse.mp3`,
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/turtle.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/turtle.mp3`,
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: `${WORDS_IMAGES_PATH}/animal-set-b/dolphin.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/animal-set-b/dolphin.mp3`,
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: `${WORDS_IMAGES_PATH}/clothes/skirt.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/skirt.mp3`,
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: `${WORDS_IMAGES_PATH}/clothes/pants.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/pants.mp3`,
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: `${WORDS_IMAGES_PATH}/clothes/blouse.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/blouse.mp3`,
    },
    {
      word: 'dress',
      translation: 'платье',
      image: `${WORDS_IMAGES_PATH}/clothes/dress.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/dress.mp3`,
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: `${WORDS_IMAGES_PATH}/clothes/boot.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/boot.mp3`,
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: `${WORDS_IMAGES_PATH}/clothes/shirt.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/shirt.mp3`,
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: `${WORDS_IMAGES_PATH}/clothes/coat.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/coat.mp3`,
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: `${WORDS_IMAGES_PATH}/clothes/shoe.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/clothes/shoe.mp3`,
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: `${WORDS_IMAGES_PATH}/emotions/sad.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/sad.mp3`,
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: `${WORDS_IMAGES_PATH}/emotions/angry.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/angry.mp3`,
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: `${WORDS_IMAGES_PATH}/emotions/happy.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/happy.mp3`,
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: `${WORDS_IMAGES_PATH}/emotions/tired.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/tired.mp3`,
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: `${WORDS_IMAGES_PATH}/emotions/surprised.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/surprised.mp3`,
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: `${WORDS_IMAGES_PATH}/emotions/scared.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/scared.mp3`,
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: `${WORDS_IMAGES_PATH}/emotions/smile.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/smile.mp3`,
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: `${WORDS_IMAGES_PATH}/emotions/laugh.jpg`,
      audio: `${WORDS_AUDIOS_PATH}/emotions/laugh.mp3`,
    },
  ],
  [
    {
      word: 'home office',
      translation: 'домашний офис',
      image: `${WORDS_IMAGES_PATH}/work/home-office.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/home-office.mp3`,
    },
    {
      word: 'earn money',
      translation: 'зарабатывать деньги',
      image: `${WORDS_IMAGES_PATH}/work/earn-money.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/earn-money.mp3`,
    },
    {
      word: 'badly paid',
      translation: 'плохо оплачиваемый',
      image: `${WORDS_IMAGES_PATH}/work/badly-paid.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/badly-paid.mp3`,
    },
    {
      word: 'well-paid',
      translation: 'хорошо оплачиваемый',
      image: `${WORDS_IMAGES_PATH}/work/well-paid.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/well-paid.mp3`,
    },
    {
      word: 'to be fired',
      translation: 'быть уволенным',
      image: `${WORDS_IMAGES_PATH}/work/to-be-fired.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/to-be-fired.mp3`,
    },
    {
      word: 'colleague',
      translation: 'коллега',
      image: `${WORDS_IMAGES_PATH}/work/colleague.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/colleague.mp3`,
    },
    {
      word: 'vacation',
      translation: 'отпуск',
      image: `${WORDS_IMAGES_PATH}/work/vacation.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/vacation.mp3`,
    },
    {
      word: 'day off',
      translation: 'выходной',
      image: `${WORDS_IMAGES_PATH}/work/day-off.png`,
      audio: `${WORDS_AUDIOS_PATH}/work/day-off.mp3`,
    },
  ],
  [
    {
      word: 'stewardess',
      translation: 'стюардесса',
      image: `${WORDS_IMAGES_PATH}/professions/stewardess.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/stewardess.mp3`,
    },
    {
      word: 'programmer',
      translation: 'программист',
      image: `${WORDS_IMAGES_PATH}/professions/programmer.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/programmer.mp3`,
    },
    {
      word: 'nurse',
      translation: 'медсестра/медбрат',
      image: `${WORDS_IMAGES_PATH}/professions/nurse.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/nurse.mp3`,
    },
    {
      word: 'teacher',
      translation: 'учитель',
      image: `${WORDS_IMAGES_PATH}/professions/teacher.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/teacher.mp3`,
    },
    {
      word: 'designer',
      translation: 'дизайнер',
      image: `${WORDS_IMAGES_PATH}/professions/designer.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/designer.mp3`,
    },
    {
      word: 'hairdresser',
      translation: 'парикмахер',
      image: `${WORDS_IMAGES_PATH}/professions/hairdresser.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/hairdresser.mp3`,
    },
    {
      word: 'cashier',
      translation: 'кассир',
      image: `${WORDS_IMAGES_PATH}/professions/cashier.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/cashier.mp3`,
    },
    {
      word: 'tour guide',
      translation: 'гид',
      image: `${WORDS_IMAGES_PATH}/professions/tour-guide.png`,
      audio: `${WORDS_AUDIOS_PATH}/professions/tour-guide.mp3`,
    },
  ],
];

CATEGORIES_CARDS.forEach((category: ICategoriesProps, index) => {
  category.amountWords = WORDS_CARDS[index].length;
});
