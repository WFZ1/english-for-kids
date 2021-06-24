import router from './components/base/router';
import header from './components/header/header';
import navDrawer from './components/nav-drawer/nav-drawer';
import categoriesField from './components/categories-field/categories-field';
import createElement from './shared/create-element';

export default class App {
  private readonly mainEl: HTMLElement;

  constructor(private readonly rootEl: HTMLElement) {
    this.mainEl = createElement('main', ['main']);

    this.render();
  }

  private render(): void {
    this.rootEl.append(header.el, this.mainEl, navDrawer.el);
  }

  private clearMainEl(): void {
    this.mainEl.innerHTML = '';
  }

  addRoutes(): void {
    router.add('', () => {
      this.clearMainEl();
      this.mainEl.append(categoriesField.el);
    });
  }
}
