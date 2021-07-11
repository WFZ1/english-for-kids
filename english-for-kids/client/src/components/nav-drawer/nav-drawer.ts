import './nav-drawer.scss';
import BaseComponent from '../base/base-component';
import Link from '../base/link/link';
import Btn from '../base/btn/btn';
import createElement from '../../shared/create-element';
import router from '../base/router';
import INavItem from '../../types/nav-item.type';
import { HAMB_MENU_OPEN_CLASS, LOGIN_BTN_TEXT, LOGIN_POPUP_SHOW_CLASS, SERVER_API_NAV_ITEMS_URL } from '../../constants';
import getData from '../../shared/get-data';

class NavDrawer extends BaseComponent {
  private readonly navEl: HTMLElement;

  private readonly containerEl: HTMLElement;

  private readonly login: Btn;

  private readonly wrapperEl: HTMLElement;

  readonly navItems: HTMLElement[] = [];

  constructor() {
    super('div', ['nav-drawer']);

    this.navEl = createElement('nav', ['nav-drawer__nav']);
    this.containerEl = createElement('ul', ['nav-drawer__container']);

    this.login = new Btn({
      classes: ['nav-drawer__login'],
      text: LOGIN_BTN_TEXT
    });

    this.wrapperEl = createElement('div', ['nav-drawer__wrapper']);

    this.render();
    this.attachListeners();
  }

  private async render(): Promise<void> {
    const navItems = await getData(SERVER_API_NAV_ITEMS_URL);

    navItems.forEach((navItem) => this.addNavItem(navItem));

    this.el.append(this.navEl, this.wrapperEl);
    this.navEl.append(this.containerEl, this.login.el);
  }

  private addNavItem({ url, text }: INavItem): void {
    const itemEl = createElement('li', ['nav-drawer__item']);
    const link = new Link({ classes: ['nav-drawer__link'], url, text });

    link.attachHandler((e) => {
      e?.preventDefault();
      NavDrawer.handleNavItem(url);
    });

    this.containerEl.append(itemEl);
    itemEl.append(link.el);

    this.navItems.push(itemEl);
  }

  private static handleNavItem(url: string): void {
    document.body.classList.remove(HAMB_MENU_OPEN_CLASS);
    router.navigate(url);
  }

  private attachListeners(): void {
    this.wrapperEl.addEventListener('click', (e) =>
      this.checkClickIsOutside(e),
    );

    this.login.el.addEventListener('click', () => {
      document.body.classList.remove(HAMB_MENU_OPEN_CLASS);
      document.body.classList.add(LOGIN_POPUP_SHOW_CLASS);
    });
  }

  private checkClickIsOutside(e: Event): void {
    if (e.target === this.wrapperEl) {
      document.body.classList.remove(HAMB_MENU_OPEN_CLASS);
    }
  }
}

const navDrawer = new NavDrawer();
export default navDrawer;
