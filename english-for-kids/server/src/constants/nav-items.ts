import { CATEGORIES_CARDS } from './categories-cards';

export const NAV_ITEMS = [
  {
    text: 'Main Page',
    url: '',
  },
];

CATEGORIES_CARDS.forEach((category) => {
  NAV_ITEMS.push({
    text: category.title,
    url: `category/${category.handle}`,
  });
});

NAV_ITEMS.push({
  text: 'Statistic Page',
  url: 'statistic',
});
