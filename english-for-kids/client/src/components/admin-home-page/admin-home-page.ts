import './admin-home-page.scss';
import CategoriesField from '../categories-field/categories-field';
import AdminCategoryCard from '../admin-category-card/admin-category-card';
import NewCard from '../new-card/new-card';
import getData from '../../shared/get-data';
import getContainEl from '../../shared/get-contain-el';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';
import { SERVER_API_CATEGORIES_URL } from '../../constants';

export default class AdminHomePage {
  private readonly categoriesField: CategoriesField;

  private readonly newCard: NewCard;

  constructor(private readonly rootEl: HTMLElement) {
    this.categoriesField = new CategoriesField(['admin-home-page__categories-field']);
    this.newCard = new NewCard(['admin-home-page__new-card'], 'Create new Category');

    this.attachListener();
  }

  render(): void {
    this.addCategories();

    this.rootEl.append(this.categoriesField.el);
  }

  private async addCategories(): Promise<void> {
    this.categoriesField.clear();

    const categories = await getData(SERVER_API_CATEGORIES_URL);

    const categoriesCards: Array<AdminCategoryCard | NewCard> = categories.map((categoryProps: IAdminCategoryCardProps) => new AdminCategoryCard(categoryProps));

    categoriesCards.push(this.newCard);

    this.categoriesField.addCards(categoriesCards);
  }

  private attachListener(): void {
    this.categoriesField.el.addEventListener('click', (e) => this.attachHandler(e));
  }

  private attachHandler(e: Event): void {
    let card = this.getCard(e, '.admin-category-card__remove');

    if (card) {
      this.removeCategory(card);
    }
    else {
      card = this.getCard(e, '.admin-category-card__btn-update');

      // if (card) {}
    }
  }

  private getCard(e: Event, selector: string): undefined | AdminCategoryCard {
    const target = getContainEl(e.target as HTMLElement, selector, this.categoriesField.el);

    if (target) {
      const el = target.closest('.admin-category-card');
      const pointer = (this.categoriesField.cards as AdminCategoryCard[]).find((card) => card.el === el);

      return pointer;
    }

    return undefined;
  }

  private async removeCategory(card: AdminCategoryCard): Promise<void> {
    const res = await fetch(`${ SERVER_API_CATEGORIES_URL }/${ card.categoryName }`, {
      method: 'DELETE'
    });

    if (res.ok) {
      card.el.remove();

      const index = this.categoriesField.cards.findIndex((currentCard) => currentCard === card);
      this.categoriesField.cards.splice(index, 1);
    }
  }
}
