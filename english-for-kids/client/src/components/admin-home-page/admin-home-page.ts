import './admin-home-page.scss';
import CategoriesField from '../categories-field/categories-field';
import getData from '../../shared/get-data';
import AdminCategoryCard from '../admin-category-card/admin-category-card';
import NewCard from '../new-card/new-card';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';
import { SERVER_API_CATEGORIES_URL } from '../../constants';

export default class AdminHomePage {
  private readonly categoriesField: CategoriesField;

  private readonly newCard: NewCard;

  constructor(private readonly rootEl: HTMLElement) {
    this.categoriesField = new CategoriesField(['admin-home-page__categories-field']);
    this.newCard = new NewCard(['admin-home-page__new-card'], 'Create new Category');
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
}
