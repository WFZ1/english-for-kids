import './admin-home-page.scss';
import CategoriesField from '../categories-field/categories-field';
import getData from '../../shared/get-data';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';
import { SERVER_API_CATEGORIES_URL } from '../../constants';
import AdminCategoryCard from '../admin-category-card/admin-category-card';
import AdminNewCategoryCard from '../admin-new-category-card/admin-new-category-card';

export default class AdminHomePage {
  private readonly categoriesField: CategoriesField;

  private readonly adminNewCategoryCard: AdminNewCategoryCard;

  constructor(private readonly rootEl: HTMLElement) {
    this.categoriesField = new CategoriesField(['admin-home-page__categories-field']);
    this.adminNewCategoryCard = new AdminNewCategoryCard();
  }

  render(): void {
    this.addCategories();

    this.rootEl.append(this.categoriesField.el);
  }

  private async addCategories(): Promise<void> {
    this.categoriesField.clear();

    const categories = await getData(SERVER_API_CATEGORIES_URL);

    const categoriesCards: Array<AdminCategoryCard | AdminNewCategoryCard> = categories.map((categoryProps: IAdminCategoryCardProps) => new AdminCategoryCard(categoryProps));

    categoriesCards.push(this.adminNewCategoryCard);

    this.categoriesField.addCards(categoriesCards);
  }
}
