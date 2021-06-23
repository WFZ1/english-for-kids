import './btn.scss';
import BaseComponent from '../base-component';
import IBtn from '../../../types/btn.type';

export default class Btn extends BaseComponent {
  constructor({ classes, text, type }: IBtn) {
    super('button', ['btn', ...classes]);

    this.render(text, type);
  }

  private render(text: string, type: string): void {
    this.el.textContent = text;
    this.el.setAttribute('type', type);
  }

  attachHandler(func: (e?: Event) => void): void {
    this.el.addEventListener('click', func);
  }
}
