import './category-page.scss';
import CardsField from '../cards-field/cards-field';
import createElement from '../../shared/create-element';
import { CATEGORY_CARDS, WORD_CARDS } from '../../constants';
import IWordCard from '../../types/word-card.type';

export default class CategoryPage {
  private readonly cardsField: CardsField;

  private readonly titleEl: HTMLElement;

  constructor(private readonly rootEl: HTMLElement) {
    this.titleEl = createElement('h2', ['category-page__title']);
    this.cardsField = new CardsField();
  }

  render(categoryName: string, title: string): void {
    this.titleEl.textContent = title;

    const data = CategoryPage.getCategoryCardsData(categoryName);
    this.cardsField.addCards(data, categoryName);

    this.rootEl.append(this.titleEl, this.cardsField.el);
  }

  private static getCategoryCardsData(categoryName: string): IWordCard[] {
    const categoryIndex = CATEGORY_CARDS.findIndex((card) => card.handle === categoryName);
    const data = WORD_CARDS[categoryIndex];
    return data;
  }
}
