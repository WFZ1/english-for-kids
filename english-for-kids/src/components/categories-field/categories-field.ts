import './categories-field.scss';
import BaseComponent from '../base/base-component';
import CategoryCard from '../category-card/category-card';
import { CATEGORY_CARDS } from '../../constants';

class CategoriesField extends BaseComponent {
  categories: CategoryCard[] = [];

  constructor() {
    super('div', ['categories-field']);

    this.addCategories();
  }

  private addCategories(): void {
    CATEGORY_CARDS.forEach((categoryProps) => {
      categoryProps.image = `./assets/images/category-cards/${ categoryProps.handle }/${ categoryProps.image }`;
      const category = new CategoryCard(categoryProps);

      this.categories.push(category)
      this.el.append(category.el)
    });
  }
}

const categoriesField = new CategoriesField();
export default categoriesField;
