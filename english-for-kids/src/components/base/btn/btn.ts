import './btn.scss';
import BaseComponent from '../base-component';
import IBtn from '../../../types/btn.type';

export default class Btn extends BaseComponent {
  constructor(props: IBtn) {
    super('button', props.classes.concat(['btn']));

    this.render(props);
  }

  private render({text, type = 'button', title }: IBtn): void {
    if (text) this.el.textContent = text;
    if (title) this.el.title = title;

    this.el.setAttribute('type', type);
  }

  attachHandler(func: (e?: Event) => void): void {
    this.el.addEventListener('click', func);
  }
}
