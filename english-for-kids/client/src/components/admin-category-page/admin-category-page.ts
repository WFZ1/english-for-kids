import './admin-category-page.scss';
import AdminWordsField from '../admin-words-field/admin-words-field';
import createElement from '../../shared/create-element';
import store from '../base/store';
import getData from '../../shared/get-data';
import IWordCardProps from '../../types/word-card-props.type';
import ICategoryCardProps from '../../types/category-card-props.type';
import { SERVER_API_CATEGORIES_URL, SERVER_API_WORDS_URL } from '../../constants';

export default class AdminCategoryPage {
  private readonly titleNameEl: HTMLElement;

  private readonly adminWordsField: AdminWordsField;

  constructor(private readonly rootEl: HTMLElement) {
    this.titleNameEl = createElement('span', ['admin-category-page__title-name']);
    this.adminWordsField = new AdminWordsField();
  }

  async render(title: string): Promise<void> {
    this.adminWordsField.clear();

    this.titleNameEl.textContent = title;
    this.adjustTitle();

    const { category } = store.getState();

    const cardsData = await AdminCategoryPage.getCategoryCardsData(category);
    this.adminWordsField.addCards(cardsData, category);

    this.rootEl.append(this.adminWordsField.el);
  }

  private static async getCategoryCardsData(categoryName: string): Promise<IWordCardProps[]> {
    const categories = await getData(SERVER_API_CATEGORIES_URL);
    const words = await getData(SERVER_API_WORDS_URL);

    const categoryIndex = categories.findIndex(
      (card: ICategoryCardProps) => card.handle === categoryName,
    );
    const data = words[categoryIndex];

    return data;
  }

  adjustTitle(): void {
    const titleEl = createElement('div', ['admin-category-page__title']);

    const titleTextEl = createElement('span', ['admin-category-page__title-text']);
    titleTextEl.textContent = 'Category:';

    this.rootEl.append(titleEl);
    titleEl.append(titleTextEl, this.titleNameEl)
  }
}
