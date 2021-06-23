import './hamburger-menu.scss';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import { hambMenuOpenClass } from '../../constants';

export default class HamburgerMenu extends Btn {
  private readonly itemTopEl: HTMLElement;

  private readonly itemMidEl: HTMLElement;

  private readonly itemBotEl: HTMLElement;

  constructor() {
    super({ classes: ['hamburger-menu'], text: '', type: '' });

    this.itemTopEl = createElement('span', [
      'hamburger-menu__item',
      'hamburger-menu__item-top',
    ]);
    this.itemMidEl = createElement('span', [
      'hamburger-menu__item',
      'hamburger-menu__item-mid',
    ]);
    this.itemBotEl = createElement('span', [
      'hamburger-menu__item',
      'hamburger-menu__item-bot',
    ]);

    this.build();
  }

  private build(): void {
    this.el.append(this.itemTopEl, this.itemMidEl, this.itemBotEl);
    this.attachHandler(() => document.body.classList.toggle(hambMenuOpenClass));
  }
}
