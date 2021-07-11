import './admin-new-category-card.scss';
import BaseComponent from '../base/base-component';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';

export default class AdminNewCategoryCard extends BaseComponent {
  private readonly titleEl: HTMLElement;

  private readonly btnAddCategory: Btn;

  constructor() {
    super('div', ['admin-new-category-card']);

    this.titleEl = createElement('h4', ['admin-new-category-card__title']);

    this.btnAddCategory = new Btn({ classes: ['admin-new-category-card__btn-add'] });

    this.render();
  }

  private render(): void {
    this.titleEl.textContent = 'Create new Category';

    // this.btnAddCategory.attachHandler(() => {
    // });

    this.el.append(this.titleEl, this.btnAddCategory.el);
  }
}
