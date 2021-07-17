import './admin-category-card.scss';
import BaseComponent from '../base/base-component';
import Btn from '../base/btn/btn';
import Link from '../base/link/link';
import AdminCategoryCardForm from '../admin-category-card-form/admin-category-card-form';
import createElement from '../../shared/create-element';
import router from '../base/router';
import IAdminCategoryCardProps from '../../types/admin-category-card-props.type';
import { SERVER_API_CATEGORY_URL } from '../../constants';

export default class AdminCategoryCard extends BaseComponent {
  categoryName: string;

  readonly btnRemove: Btn;

  readonly containerEl: HTMLElement;

  titleEl: HTMLElement;

  private readonly amountWordsEl: HTMLElement;

  readonly btnUpdate: Btn;

  linkToWord: Link;

  readonly adminCategoryCardForm: AdminCategoryCardForm;

  constructor(categoryProps: IAdminCategoryCardProps) {
    super('div', ['admin-category-card']);

    this.categoryName = categoryProps.handle;

    this.containerEl = createElement('div', ['admin-category-card__container']);

    this.btnRemove = new Btn({ classes: ['admin-category-card__remove'] });
    this.titleEl = createElement('h4', ['admin-category-card__title']);
    this.amountWordsEl = createElement('span', [
      'admin-category-card__amount-words',
    ]);

    this.btnUpdate = new Btn({
      classes: ['admin-category-card__btn', 'admin-category-card__btn-update'],
      text: 'Update',
    });
    this.linkToWord = new Link({
      classes: [
        'admin-category-card__btn',
        'admin-category-card__link-to-word',
      ],
      url: categoryProps.handle,
      text: 'Add word',
    });

    this.adminCategoryCardForm = new AdminCategoryCardForm({
      formClasses: [
        'admin-category-card__form-update',
        'admin-category-card-form_hidden',
      ],
      formAction: SERVER_API_CATEGORY_URL,
      formMethod: 'PATCH',
      inputValue: categoryProps.title,
      btnClasses: ['admin-category-card__btn'],
      btnCancelClass: 'admin-category-card__btn-cancel-update',
      btnActClass: 'admin-category-card__btn-save-update',
      btnActText: 'Save',
    });

    this.build(categoryProps);
  }

  private build(categoryProps: IAdminCategoryCardProps): void {
    this.titleEl.textContent = categoryProps.title;

    this.amountWordsEl.textContent = 'Words:';
    this.amountWordsEl.dataset.amountWords = String(categoryProps.amountWords);

    this.el.append(
      this.btnRemove.el,
      this.containerEl,
      this.adminCategoryCardForm.el,
    );
    this.containerEl.append(
      this.titleEl,
      this.amountWordsEl,
      this.btnUpdate.el,
      this.linkToWord.el,
    );

    // TODO: do events delegation
    this.linkToWord.attachHandler((e) => {
      e?.preventDefault();
      router.navigate(`admin/category/${this.categoryName}`);
    });
  }
}
