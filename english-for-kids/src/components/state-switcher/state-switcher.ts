import './state-switcher.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import store from '../base/store';
import { GAME_MODE_CHANGE, PLAY, TRAIN } from '../../constants';

class StateSwitcher extends BaseComponent {
  private readonly checkboxEl: HTMLElement;

  private readonly panelEl: HTMLElement;

  private readonly handleEl: HTMLElement;

  constructor() {
    super('label', ['state-switcher']);

    this.checkboxEl = createElement('input', ['state-switcher__checkbox']);
    this.panelEl = createElement('span', ['switcher__panel']);
    this.handleEl = createElement('span', ['switcher__handle']);

    this.attachListener();
    this.render();
  }

  private render(): void {
    this.checkboxEl.setAttribute('type', 'checkbox');
    this.checkboxEl.setAttribute('checked', '');

    this.panelEl.dataset.on = 'Train';
    this.panelEl.dataset.off = 'Play';

    this.el.append(this.checkboxEl, this.panelEl, this.handleEl);
  }

  private attachListener(): void {
    this.checkboxEl.addEventListener('change', () => this.changeState());
  }

  private changeState(): void {
    if ((this.checkboxEl as HTMLInputElement).checked) {
      store.dispatch({ type: GAME_MODE_CHANGE, gameMode: TRAIN });
    } else {
      store.dispatch({ type: GAME_MODE_CHANGE, gameMode: PLAY });
    }
  }
}

const stateSwitcher = new StateSwitcher();
export default stateSwitcher;
