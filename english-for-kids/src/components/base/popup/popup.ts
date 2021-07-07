import './popup.scss';
import BaseComponent from '../base-component';
import createElement from '../../../shared/create-element';

export default class Popup extends BaseComponent {
  readonly containerEl: HTMLElement;

  constructor(
    classes: string[],
    containerClass: string,
    private readonly hiddenClass: string = 'popup_hidden',
  ) {
    super('div', classes.concat(['popup', hiddenClass]));

    this.containerEl = createElement('div', [
      'popup__container',
      containerClass,
    ]);

    this.attachListeners();
    this.build();
  }

  private build(): void {
    this.el.append(this.containerEl);
  }

  protected attachListeners(): void {
    this.el.addEventListener('click', (e) => this.checkClickIsOutside(e));
  }

  protected checkClickIsOutside(e: Event): void {
    if (e.target === this.el) this.hidePopup();
  }

  showPopup(): void {
    this.el.classList.remove(this.hiddenClass);
  }

  hidePopup(): void {
    this.el.classList.add(this.hiddenClass);
  }
}
