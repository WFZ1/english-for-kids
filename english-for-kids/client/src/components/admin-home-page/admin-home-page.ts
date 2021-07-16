import './admin-home-page.scss';
import CategoriesField from '../categories-field/categories-field';
import AdminCategoryCard from '../admin-category-card/admin-category-card';
import NewCard from '../new-card/new-card';
import getData from '../../shared/get-data';
import getContainEl from '../../shared/get-contain-el';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';
import { SERVER_API_CATEGORIES_URL, SERVER_API_CATEGORY_URL } from '../../constants';
import handleizeString from '../../shared/handleize-string';

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
      return;
    }

    card = this.getCard(e, '.admin-category-card__btn-update');

    if (card) {
      AdminHomePage.showFormUpdate(card);
      return;
    }

    card = this.getCard(e, '.admin-category-card__btn-cancel-update');

    if (card) {
      AdminHomePage.hideFormUpdate(card);
      return;
    }

    card = this.getCard(e, '.admin-category-card__btn-save-update');

    if (card) {
      AdminHomePage.updateCategory(card);
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
    const res = await fetch(`${ SERVER_API_CATEGORY_URL }/${ card.categoryName }`, {
      method: 'DELETE'
    });

    if (res.ok) {
      card.el.remove();

      const index = this.categoriesField.cards.findIndex((currentCard) => currentCard === card);
      this.categoriesField.cards.splice(index, 1);
    }
  }

  private static showFormUpdate(card: AdminCategoryCard): void {
    card.containerEl.classList.add('admin-category-card__container_hidden');
    card.adminCategoryCardForm.el.classList.remove('admin-category-card-form_hidden');
  }

  private static hideFormUpdate(card: AdminCategoryCard): void {
    card.adminCategoryCardForm.el.classList.add('admin-category-card-form_hidden');
    card.containerEl.classList.remove('admin-category-card__container_hidden');
  }

  private static async updateCategory(card: AdminCategoryCard): Promise<void> {
    const newCardTitle = card.adminCategoryCardForm.field.getValue();

    if (newCardTitle === card.titleEl.textContent) return;

    const data = {
      handle: handleizeString(newCardTitle),
      title: newCardTitle
    };

    const res = await fetch(`${ SERVER_API_CATEGORY_URL }/${ card.categoryName }`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      card.titleEl.textContent = data.title;
      (card.linkToWord.el as HTMLLinkElement).href = (card.linkToWord.el as HTMLLinkElement).href.replace(card.categoryName, data.handle);

      card.categoryName = data.handle;
      AdminHomePage.hideFormUpdate(card);
    }
  }
}
