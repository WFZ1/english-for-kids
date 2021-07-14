import './admin-category-card.scss';
import Link from '../base/link/link';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import router from '../base/router';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';
import BaseComponent from '../base/base-component';

export default class AdminCategoryCard extends BaseComponent {
  private readonly removeEl: HTMLElement;

  private readonly titleEl: HTMLElement;

  private readonly amountWordsEl: HTMLElement;

  private readonly btnUpdate: Btn;

  private readonly linkToWord: Link;

  constructor(categoryProps: IAdminCategoryCardProps) {
    super('div', ['admin-category-card']);

    this.removeEl = createElement('span', ['admin-category-card__remove']);
    this.titleEl = createElement('h4', ['admin-category-card__title']);
    this.amountWordsEl = createElement('span', ['admin-category-card__amount-words']);

    this.btnUpdate = new Btn({ classes: ['admin-category-card__btn', 'admin-category-card__btn-update'], text: 'Update' });
    this.linkToWord = new Link({ classes: ['admin-category-card__btn', 'admin-category-card__link-to-word'], url: categoryProps.handle, text: 'Add word' });

    this.build(categoryProps);
  }

  private build(categoryProps: IAdminCategoryCardProps): void {
    this.titleEl.textContent = categoryProps.title;

    this.amountWordsEl.textContent = 'Words:';
    this.amountWordsEl.dataset.amountWords = String(categoryProps.amountWords);

    this.el.append(this.removeEl, this.titleEl, this.amountWordsEl, this.btnUpdate.el, this.linkToWord.el);

    this.linkToWord.attachHandler((e) => {
      e?.preventDefault();
      router.navigate(`admin/category/${categoryProps.handle}`);
    });
  }
}
