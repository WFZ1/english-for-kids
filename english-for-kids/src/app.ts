import router from './components/base/router';
import header from './components/header/header';
import footer from './components/footer/footer';
import navDrawer from './components/nav-drawer/nav-drawer';
import categoriesField from './components/categories-field/categories-field';
import createElement from './shared/create-element';
import { NAV_ITEM_ACTIVE_CLASS } from './constants';

export default class App {
  private readonly mainEl: HTMLElement;

  constructor(private readonly rootEl: HTMLElement) {
    this.mainEl = createElement('main', ['main', 'page__main']);

    this.render();
  }

  private render(): void {
    this.rootEl.append(header.el, this.mainEl, footer.el, navDrawer.el);
  }

  private clearMainEl(): void {
    this.mainEl.innerHTML = '';
  }

  private static resetStateNavItems(): void {
    navDrawer.navItems.forEach((item) =>
      item.classList.remove(NAV_ITEM_ACTIVE_CLASS),
    );
  }

  private static findHighlightNavItem(url: string): void {
    const navItemIndex = navDrawer.navItems.findIndex((item) => {
      const link = item.children[0] as HTMLAnchorElement;
      return link.pathname === `/${ url }`;
    });

    App.highlightNavItem(navItemIndex);
  }

  private static highlightNavItem(index: number): void {
    navDrawer.navItems[index].classList.add(NAV_ITEM_ACTIVE_CLASS);
  }

  addRoutes(): void {
    router
      .add(/category\/(.*)/, (props: RegExpMatchArray) => {
        this.clearMainEl();
        this.mainEl.append(props[1]);

        App.resetStateNavItems();
        App.findHighlightNavItem(props[0]);
      })
      .add('', () => {
        this.clearMainEl();
        this.mainEl.append(categoriesField.el);

        App.resetStateNavItems();
        App.highlightNavItem(0);
      });
  }
}
