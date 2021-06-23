import './state-switcher.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';

class StateSwitcher extends BaseComponent {
  private readonly checkboxEl: HTMLElement;

  private readonly panelEl: HTMLElement;

  private readonly handleEl: HTMLElement;

  constructor() {
    super('label', ['state-switcher']);

    this.checkboxEl = createElement('input', ['state-switcher__checkbox']);
    this.panelEl = createElement('span', ['switcher__panel']);
    this.handleEl = createElement('span', ['switcher__handle']);

    this.render();
  }

  private render(): void {
    this.checkboxEl.setAttribute('type', 'checkbox');
    this.checkboxEl.setAttribute('checked', '');

    this.panelEl.dataset.on = 'Train';
    this.panelEl.dataset.off = 'Play';

    this.el.append(this.checkboxEl, this.panelEl, this.handleEl);
  }
}

const stateSwitcher = new StateSwitcher();
export default stateSwitcher;
