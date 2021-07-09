import './admin-nav.scss';
import BaseComponent from '../base/base-component';
import Link from '../base/link/link';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import router from '../base/router';
import INavItem from '../../types/nav-item.type';
import { ADMIN_NAV_ITEMS, LOGOUT_BTN_TEXT } from '../../constants';

class AdminNav extends BaseComponent {
  private readonly containerEl: HTMLElement;

  private readonly logout: Btn;

  readonly navItems: HTMLElement[] = [];

  constructor() {
    super('nav', ['admin-nav']);

    this.containerEl = createElement('ul', ['admin-nav__container']);

    this.logout = new Btn({
      classes: ['admin-nav__logout'],
      text: LOGOUT_BTN_TEXT
    });

    this.render();
  }

  private render(): void {
    ADMIN_NAV_ITEMS.forEach((navItem) => this.addNavItem(navItem));

    // this.logout.attachHandler(this.handleLogout.bind(this));

    this.el.append(this.containerEl, this.logout.el);
  }

  private addNavItem({ url, text }: INavItem): void {
    const itemEl = createElement('li', ['admin-nav__item']);
    const link = new Link({ classes: ['admin-nav__link'], url, text });

    link.attachHandler((e) => {
      e?.preventDefault();
      router.navigate(url);
    });

    this.containerEl.append(itemEl);
    itemEl.append(link.el);

    this.navItems.push(itemEl);
  }

  // private handleLogout(): void {
  // }
}

const adminNav = new AdminNav();
export default adminNav;
