import router from './components/base/router';
import store from './components/base/store';
import header from './components/header/header';
import footer from './components/footer/footer';
import navDrawer from './components/nav-drawer/nav-drawer';
import LoginPopup from './components/login-popup/login-popup';
import HomePage from './components/home-page/home-page';
import CategoryPage from './components/category-page/category-page';
import StatisticPage from './components/statistic-page/statistic-page';
import AdminHomePage from './components/admin-home-page/admin-home-page';
import AdminCategoryPage from './components/admin-category-page/admin-category-page';
import GameEndSplashScreen from './components/game-end-splash-screen/game-end-splash-screen';
import createElement from './shared/create-element';
import delay from './shared/delay';
import {
  APP_PAGE_CHANGE,
  APP_PAGES,
  NAV_ITEM_ACTIVE_CLASS,
  TRAIN,
  GAME_END_SPLASH_SCREEN,
  GAME_END,
  APP_AUTHORIZATION,
} from './constants';

export default class App {
  private readonly mainEl: HTMLElement;

  private readonly loginPopup: LoginPopup;

  private readonly homePage: HomePage;

  private readonly categoryPage: CategoryPage;

  private readonly statisticPage: StatisticPage;

  private readonly adminHomePage: AdminHomePage;

  private readonly adminCategoryPage: AdminCategoryPage;

  private readonly gameEndSplashScreenSuccess: GameEndSplashScreen;

  private readonly gameEndSplashScreenFail: GameEndSplashScreen;

  constructor(private readonly rootEl: HTMLElement) {
    this.mainEl = createElement('main', ['main', 'page__main']);

    this.loginPopup = new LoginPopup();

    this.homePage = new HomePage(this.mainEl);
    this.categoryPage = new CategoryPage(this.mainEl);
    this.statisticPage = new StatisticPage(this.mainEl);
    this.adminHomePage = new AdminHomePage(this.mainEl);
    this.adminCategoryPage = new AdminCategoryPage(this.mainEl);

    this.gameEndSplashScreenSuccess = new GameEndSplashScreen(
      ['game-end-splash-screen-success'],
      GAME_END_SPLASH_SCREEN.success,
    );
    this.gameEndSplashScreenFail = new GameEndSplashScreen(
      ['game-end-splash-screen-fail'],
      GAME_END_SPLASH_SCREEN.fail,
    );

    App.checkAdminAuth();
    this.initStateApp();
    this.render();
  }

  private render(): void {
    this.rootEl.append(header.el, this.mainEl, footer.el);
  }

  private renderUserPart(): void {
    this.rootEl.append(navDrawer.el, this.loginPopup.el);
  }

  private renderAdminPart(): void {
    navDrawer.el.remove();
    this.loginPopup.el.remove();
  }

  private static checkAdminAuth(): void {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      store.dispatch({ type: APP_AUTHORIZATION, isAdmin: true });
    }
  }

  addRoutes(): void {
    router
      .add(/^category\/(.*)/, (props) => this.renderCategoryPage(props))
      .add('statistic', () => this.renderStatisticPage())
      .add(/admin\/category\/(.*)/, (props) =>
        this.renderAdminCategoryPage(props),
      )
      .add('admin', () => this.renderAdminHomePage())
      .add('', () => this.renderHomePage());
  }

  private renderCategoryPage(props: RegExpMatchArray): void {
    this.clearMainEl();

    if (App.redirectAdmin()) return;

    App.resetPageName();
    document.body.classList.add('category-page');

    App.resetStateNavItems();
    App.findHighlightNavItem(props[0]);

    store.dispatch({
      type: APP_PAGE_CHANGE,
      currentPage: APP_PAGES.category,
      category: props[1],
    });
    this.categoryPage.render(props[1]);
  }

  private renderStatisticPage(): void {
    this.clearMainEl();

    if (App.redirectAdmin()) return;

    App.resetPageName();
    document.body.classList.add('statistic-page');

    App.resetStateNavItems();
    App.highlightNavItem(navDrawer.navItems.length - 1);

    store.dispatch({
      type: APP_PAGE_CHANGE,
      currentPage: APP_PAGES.statistic,
    });
    this.statisticPage.render();
  }

  private renderAdminCategoryPage(props: RegExpMatchArray): void {
    this.clearMainEl();

    if (App.redirectUser()) return;

    App.resetPageName();
    document.body.classList.add('admin-category-page');

    store.dispatch({
      type: APP_PAGE_CHANGE,
      currentPage: APP_PAGES.adminCategory,
      category: props[1],
    });
    this.adminCategoryPage.render(props[1]);
  }

  private renderAdminHomePage(): void {
    this.clearMainEl();

    if (App.redirectUser()) return;

    App.resetPageName();
    document.body.classList.add('admin-home-page');

    store.dispatch({ type: APP_PAGE_CHANGE, currentPage: APP_PAGES.adminHome });
    this.adminHomePage.render();
  }

  private async renderHomePage(): Promise<void> {
    this.clearMainEl();

    if (App.redirectAdmin()) return;

    if (store.getState().isLogInOutDone) {
      await navDrawer.render();
    }

    App.resetPageName();
    document.body.classList.add('home-page');

    App.resetStateNavItems();
    App.highlightNavItem(0);

    store.dispatch({ type: APP_PAGE_CHANGE, currentPage: APP_PAGES.home });
    this.homePage.render();
  }

  private static redirectAdmin(): boolean {
    if (store.getState().isAdmin) {
      router.navigate('admin');
      return true;
    }

    return false;
  }

  private static redirectUser(): boolean {
    if (!store.getState().isAdmin) {
      router.navigate('/');
      return true;
    }

    return false;
  }

  private clearMainEl(): void {
    this.mainEl.innerHTML = '';
  }

  private static resetPageName(): void {
    document.body.classList.forEach((className) => {
      if (/.+-page$/.test(className)) {
        document.body.classList.remove(className);
      }
    });
  }

  private static resetStateNavItems(): void {
    navDrawer.navItems.forEach((item) =>
      item.classList.remove(NAV_ITEM_ACTIVE_CLASS),
    );
  }

  private static findHighlightNavItem(url: string): void {
    const navItemIndex = navDrawer.navItems.findIndex((item) => {
      const link = item.children[0] as HTMLAnchorElement;

      return link.pathname.indexOf(url) + 1;
    });

    if (navItemIndex >= 0) App.highlightNavItem(navItemIndex);
  }

  private static highlightNavItem(index: number): void {
    const navItem = navDrawer.navItems[index];
    navItem.classList.add(NAV_ITEM_ACTIVE_CLASS);
  }

  private initStateApp(): void {
    this.changeStateApp();
    store.subscribe(this.changeStateApp.bind(this));

    this.logInOutDone();
  }

  private changeStateApp(): void {
    const state = store.getState();

    if (state.isLogInOutDone) {
      this.logInOutDone();
      return;
    }

    if (state.gameMode === TRAIN) {
      document.body.classList.remove('game-mode-play');
      document.body.classList.add('game-mode-train');
    } else {
      document.body.classList.remove('game-mode-train');
      document.body.classList.add('game-mode-play');

      if (state.isEndGame) {
        if (state.countErrors) this.showMistakesGameEnd();
        else this.showCongratulationsGameEnd();
      }
    }
  }

  private logInOutDone(): void {
    if (store.getState().isAdmin) {
      header.changeView(true);
      this.renderAdminPart();

      document.body.classList.remove('game-mode-play');
      document.body.classList.remove('game-mode-train');
    } else {
      header.changeView();
      this.renderUserPart();
    }
  }

  private showCongratulationsGameEnd(): void {
    this.showSplashScreenGameEnd(this.gameEndSplashScreenSuccess);
  }

  private showMistakesGameEnd(): void {
    const countGameErrors = store.getState().countErrors;
    const failText = `${countGameErrors} ${GAME_END_SPLASH_SCREEN.fail.text}`;

    this.gameEndSplashScreenFail.changeTitleText(failText);

    this.showSplashScreenGameEnd(this.gameEndSplashScreenFail);
  }

  private async showSplashScreenGameEnd(
    splashScreen: GameEndSplashScreen,
  ): Promise<void> {
    this.rootEl.append(splashScreen.el);

    await delay(1000);
    splashScreen.show();
    await delay(4000);

    store.dispatch({ type: GAME_END });
    router.navigate('');
    splashScreen.hide();

    await delay(1000);
    splashScreen.el.remove();
  }
}
