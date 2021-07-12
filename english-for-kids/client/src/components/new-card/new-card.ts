import './new-card.scss';
import BaseComponent from '../base/base-component';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';

export default class NewCard extends BaseComponent {
  private readonly titleEl: HTMLElement;

  private readonly btnAdd: Btn;

  constructor(classes: string[] = [], text: string) {
    super('div', classes.concat(['new-card']));

    this.titleEl = createElement('h4', ['new-card__title']);
    this.btnAdd = new Btn({ classes: ['new-card__btn-add'] });

    this.render(text);
  }

  private render(text: string): void {
    this.titleEl.textContent = text;

    // this.btnAddCategory.attachHandler(() => {
    // });

    this.el.append(this.titleEl, this.btnAdd.el);
  }
}
