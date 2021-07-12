import './admin-category-card.scss';
import Link from '../base/link/link';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import router from '../base/router';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';

export default class AdminCategoryCard extends Link {
  private readonly removeEl: HTMLElement;

  private readonly titleEl: HTMLElement;

  private readonly amountWordsEl: HTMLElement;

  private readonly btnUpdate: Btn;

  private readonly btnAddWord: Btn;

  constructor(categoryProps: IAdminCategoryCardProps) {
    super({ classes: ['admin-category-card'], url: categoryProps.handle });

    this.removeEl = createElement('span', ['admin-category-card__remove']);
    this.titleEl = createElement('h4', ['admin-category-card__title']);
    this.amountWordsEl = createElement('span', ['admin-category-card__amount-words']);

    this.btnUpdate = new Btn({ classes: ['admin-category-card__btn', 'admin-category-card__btn-update'], text: 'Update' });
    this.btnAddWord = new Btn({ classes: ['admin-category-card__btn', 'admin-category-card__btn-add'], text: 'Add word' });

    this.build(categoryProps);
  }

  private build(categoryProps: IAdminCategoryCardProps): void {
    this.titleEl.textContent = categoryProps.title;

    this.amountWordsEl.textContent = 'Words:';
    this.amountWordsEl.dataset.amountWords = String(categoryProps.amountWords);

    this.el.append(this.removeEl, this.titleEl, this.amountWordsEl, this.btnUpdate.el, this.btnAddWord.el);

    this.attachHandler((e) => {
      e?.preventDefault();
      router.navigate(`admin/category/${categoryProps.handle}`);
    });
  }
}
