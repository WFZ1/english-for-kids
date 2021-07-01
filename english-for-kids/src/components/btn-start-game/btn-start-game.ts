import './btn-start-game.scss';
import Btn from "../base/btn/btn";
import { BTN_START_GAME_TEXT, TRAIN } from '../../constants';
import store from '../base/store';

export default class BtnStartGame extends Btn {
  constructor (classes: string[]) {
    super({ classes: classes.concat(['btn-start-game']), text: BTN_START_GAME_TEXT });

    this.subscribeToChangeAppState();
  }

  attachHandlerStartGame(func: (e?: Event) => void): void {
    this.attachHandler(() => {
      this.changeView();
      func();
    });
  }

  private changeView(): void {
    this.el.classList.add('btn-start-game_repeat');
  }

  private subscribeToChangeAppState(): void {
    store.subscribe(this.resetToDefault.bind(this));
  }

  private resetToDefault(): void {
    const state = store.getState();

    if (state.gameMode === TRAIN || state.isPageChange) {
      this.el.classList.remove('btn-start-game_repeat');
    }
  }
}
