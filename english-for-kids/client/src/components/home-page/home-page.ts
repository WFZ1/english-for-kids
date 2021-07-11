import './home-page.scss';
import CategoriesField from '../categories-field/categories-field';
import CategoryCard from '../category-card/category-card';
import getData from '../../shared/get-data';
import ICategoryCardProps from '../../types/category-card-props.type';
import { SERVER_API_CATEGORIES_URL } from '../../constants';

export default class HomePage {
  private readonly categoriesField: CategoriesField;

  constructor(private readonly rootEl: HTMLElement) {
    this.categoriesField = new CategoriesField();
  }

  render(): void {
    this.addCategories();

    this.rootEl.append(this.categoriesField.el);
  }

  private async addCategories(): Promise<void> {
    this.categoriesField.clear();

    const categories = await getData(SERVER_API_CATEGORIES_URL);

    const categoriesCards = categories.map((categoryProps: ICategoryCardProps) => {
      categoryProps.image = `./assets/images/category-cards/${categoryProps.handle}/${categoryProps.image}`;
      return new CategoryCard(categoryProps);
    });

    this.categoriesField.addCards(categoriesCards);
  }
}
