import './btn-start-game.scss';
import Btn from '../base/btn/btn';
import store from '../base/store';
import { BTN_START_GAME_TEXT, TRAIN } from '../../constants';

export default class BtnStartGame extends Btn {
  constructor(classes: string[]) {
    super({
      classes: classes.concat(['btn-start-game']),
      text: BTN_START_GAME_TEXT,
    });

    this.subscribeToChangeAppState();
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

  attachHandlerStartGame(func: (e?: Event) => void): void {
    this.attachHandler(() => func());
  }

  changeView(): void {
    this.el.classList.add('btn-start-game_repeat');
  }
}
