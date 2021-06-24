import './link.scss';
import BaseComponent from '../base-component';
import ILink from '../../../types/link.type';

export default class Link extends BaseComponent {
  constructor(props: ILink) {
    super('a', props.classes.concat(['link']));

    this.render(props);
  }

  private render({ url, text, target }: ILink): void {
    this.el.setAttribute('href', url);

    if (text) this.el.textContent = text;
    if (target) this.el.setAttribute('target', target);
  }

  attachHandler(func: (e?: Event) => void): void {
    this.el.addEventListener('click', func);
  }
}
