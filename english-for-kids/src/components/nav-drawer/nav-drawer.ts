import './nav-drawer.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import { hambMenuOpenClass, NAV_ITEMS } from '../../constants';
import Link from '../base/link/link';
import INavItem from '../../types/nav-item.type';

class NavDrawer extends BaseComponent {
  private readonly navEl: HTMLElement;

  private readonly wrapperEl: HTMLElement;

  private readonly containerEl: HTMLElement;

  private readonly navItems: HTMLElement[] = [];

  constructor() {
    super('div', ['nav-drawer']);

    this.navEl = createElement('nav', ['nav-drawer__nav']);
    this.containerEl = createElement('ul', ['nav-drawer__container']);
    this.wrapperEl = createElement('div', ['nav-drawer__wrapper']);

    this.render();
    this.attachListeners();
  }

  private render(): void {
    NAV_ITEMS.forEach((navItem) => this.addNavItem(navItem));

    this.el.append(this.navEl, this.wrapperEl);
    this.navEl.append(this.containerEl);
  }

  private addNavItem({ url, text }: INavItem): void {
    const itemEl = createElement('li', ['nav-drawer__item']);
    const link = new Link({ classes: ['nav-drawer__link'], url, text });

    this.containerEl.append(itemEl);
    itemEl.append(link.el);

    this.navItems.push(itemEl);
  }

  private attachListeners(): void {
    this.wrapperEl.addEventListener('click', (e) =>
      this.checkClickIsOutside(e),
    );
  }

  private checkClickIsOutside(e: Event): void {
    if (e.target === this.wrapperEl) {
      document.body.classList.remove(hambMenuOpenClass);
    }
  }
}

const navDrawer = new NavDrawer();
export default navDrawer;
