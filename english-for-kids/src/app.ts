import router from './components/base/router';
import store from './components/base/store';
import header from './components/header/header';
import footer from './components/footer/footer';
import navDrawer from './components/nav-drawer/nav-drawer';
import LoginPopup from './components/login-popup/login-popup';
import categoriesField from './components/categories-field/categories-field';
import CategoryPage from './components/category-page/category-page';
import StatisticPage from './components/statistic-page/statistic-page';
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
} from './constants';

export default class App {
  private readonly mainEl: HTMLElement;

  private readonly loginPopup: LoginPopup;

  private readonly categoryPage: CategoryPage;

  private readonly statisticPage: StatisticPage;

  private readonly gameEndSplashScreenSuccess: GameEndSplashScreen;

  private readonly gameEndSplashScreenFail: GameEndSplashScreen;

  constructor(private readonly rootEl: HTMLElement) {
    this.mainEl = createElement('main', ['main', 'page__main']);

    this.loginPopup = new LoginPopup();

    this.categoryPage = new CategoryPage(this.mainEl);
    this.statisticPage = new StatisticPage(this.mainEl);

    this.gameEndSplashScreenSuccess = new GameEndSplashScreen(
      ['game-end-splash-screen-success'],
      GAME_END_SPLASH_SCREEN.success,
    );
    this.gameEndSplashScreenFail = new GameEndSplashScreen(
      ['game-end-splash-screen-fail'],
      GAME_END_SPLASH_SCREEN.fail,
    );

    this.render();
  }

  private render(): void {
    this.rootEl.append(header.el, this.mainEl, footer.el, navDrawer.el, this.loginPopup.el);
    this.initStateApp();
  }

  addRoutes(): void {
    router
      .add(/category\/(.*)/, (props: RegExpMatchArray) => {
        this.clearMainEl();

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
      })
      .add('statistic', () => {
        this.clearMainEl();

        App.resetPageName();
        document.body.classList.add('statistic-page');

        App.resetStateNavItems();
        App.highlightNavItem(navDrawer.navItems.length - 1);

        store.dispatch({
          type: APP_PAGE_CHANGE,
          currentPage: APP_PAGES.statistic,
        });
        this.statisticPage.render();
      })
      .add('', () => {
        this.clearMainEl();

        App.resetPageName();
        document.body.classList.add('home-page');

        App.resetStateNavItems();
        App.highlightNavItem(0);

        store.dispatch({ type: APP_PAGE_CHANGE, currentPage: APP_PAGES.home });
        this.mainEl.append(categoriesField.el);
      });
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

      return link.pathname === `/${url}`;
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
  }

  private changeStateApp(): void {
    const state = store.getState();

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
