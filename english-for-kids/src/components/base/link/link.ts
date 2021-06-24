import './link.scss';
import BaseComponent from '../base-component';
import ILink from '../../../types/link.type';

export default class Link extends BaseComponent {
  constructor({ classes, url, text }: ILink) {
    super('a', ['link', ...classes]);

    this.render(url, text);
  }

  private render(url: string, text: string): void {
    this.el.setAttribute('href', url);
    this.el.textContent = text;
  }

  attachHandler(func: (e?: Event) => void): void {
    this.el.addEventListener('click', func);
  }
}
