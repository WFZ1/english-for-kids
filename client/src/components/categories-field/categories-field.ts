import './categories-field.scss';
import BaseComponent from '../base/base-component';
import type CategoryCard from '../category-card/category-card';
import type AdminCategoryCard from '../admin-category-card/admin-category-card';
import type newCard from '../new-card/new-card';

export default class CategoriesField extends BaseComponent {
  cards: CategoryCard[] | Array<AdminCategoryCard | newCard> = [];

  constructor(classes: string[] = []) {
    super('div', classes.concat(['categories-field']));
  }

  clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  addCards(cards: CategoryCard[] | Array<AdminCategoryCard | newCard>): void {
    this.cards = cards;
    this.cards.forEach((card) => this.el.append(card.el));
  }
}
