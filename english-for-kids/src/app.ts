import router from './components/base/router';
import header from './components/header/header';
import footer from './components/footer/footer';
import navDrawer from './components/nav-drawer/nav-drawer';
import categoriesField from './components/categories-field/categories-field';
import createElement from './shared/create-element';
import { NAV_ITEM_ACTIVE_CLASS, TRAIN } from './constants';
import CategoryPage from './components/category-page/category-page';
import store from './components/base/store';

export default class App {
  private currentPage = '';

  private readonly mainEl: HTMLElement;

  private readonly categoryPage: CategoryPage;

  constructor(private readonly rootEl: HTMLElement) {
    this.mainEl = createElement('main', ['main', 'page__main']);

    this.categoryPage = new CategoryPage(this.mainEl);

    this.render();
  }

  private render(): void {
    this.rootEl.append(header.el, this.mainEl, footer.el, navDrawer.el);
    App.initStateApp();
  }

  private clearMainEl(): void {
    this.mainEl.innerHTML = '';
  }

  private static resetStateNavItems(): void {
    navDrawer.navItems.forEach((item) =>
      item.classList.remove(NAV_ITEM_ACTIVE_CLASS),
    );
  }

  private findHighlightNavItem(url: string): void {
    const navItemIndex = navDrawer.navItems.findIndex((item) => {
      const link = item.children[0] as HTMLAnchorElement;
      return link.pathname === `/${ url }`;
    });

    this.highlightNavItem(navItemIndex);
  }

  private highlightNavItem(index: number): void {
    const navItem = navDrawer.navItems[index];
    navItem.classList.add(NAV_ITEM_ACTIVE_CLASS);

    this.currentPage = navItem.children[0].textContent || '';
  }

  addRoutes(): void {
    router
      .add(/category\/(.*)/, (props: RegExpMatchArray) => {
        this.clearMainEl();
        document.body.classList.add('category-page');

        App.resetStateNavItems();
        this.findHighlightNavItem(props[0]);

        this.categoryPage.render(props[1], this.currentPage);
      })
      .add('', () => {
        this.clearMainEl();

        App.resetStateNavItems();
        this.highlightNavItem(0);

        this.mainEl.append(categoriesField.el);
      });
  }

  private static initStateApp(): void {
    App.changeStateApp();
    store.subscribe(App.changeStateApp);
  }

  private static changeStateApp(): void {
    if (store.getState().gameState === TRAIN) {
      document.body.classList.remove('game-mode-play');
      document.body.classList.add('game-mode-train');
    } else {
      document.body.classList.remove('game-mode-train');
      document.body.classList.add('game-mode-play');
    }
  }
}
