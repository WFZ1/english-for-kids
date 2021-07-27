import './header.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import HamburgerMenu from '../hamburger-menu/hamburger-menu';
import stateSwitcher from '../state-switcher/state-switcher';
import adminNav from '../admin-nav/admin-nav';

class Header extends BaseComponent {
  private readonly containerEl: HTMLElement;

  private readonly hamburgerMenu: HamburgerMenu;

  constructor() {
    super('header', ['header']);

    this.containerEl = createElement('div', ['header__container']);
    this.hamburgerMenu = new HamburgerMenu();

    this.render();
  }

  private render(): void {
    this.el.append(this.containerEl);
  }

  changeView(isAdmin = false) {
    this.containerEl.innerHTML = '';

    if (isAdmin) {
      this.renderAdminPart();
    } else {
      this.renderUserPart();
    }
  }

  private renderUserPart(): void {
    document.body.classList.remove('admin-auth');
    this.containerEl.append(this.hamburgerMenu.el, stateSwitcher.el);
  }

  private renderAdminPart(): void {
    document.body.classList.add('admin-auth');
    this.containerEl.append(adminNav.el);
  }
}

const header = new Header();
export default header;
