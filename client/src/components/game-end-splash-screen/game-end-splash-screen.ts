import './game-end-splash-screen.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import IGameEndSplashScreenProps from '../../types/game-end-splash-screen-props.type';

export default class GameEndSplashScreen extends BaseComponent {
  private readonly titleEl: HTMLElement;

  private readonly imageEl: HTMLElement;

  private readonly audioEl: HTMLAudioElement;

  constructor(classes: string[] = [], props: IGameEndSplashScreenProps) {
    super(
      'div',
      classes.concat([
        'game-end-splash-screen',
        'game-end-splash-screen_hidden',
      ]),
    );

    this.titleEl = createElement('p', ['game-end-splash-screen__title']);
    this.imageEl = createElement('img', ['game-end-splash-screen__img']);
    this.audioEl = new Audio(props.audio);

    this.render(props);
  }

  private render(props: IGameEndSplashScreenProps): void {
    this.titleEl.textContent = props.text;
    this.imageEl.setAttribute('src', props.image);

    this.el.append(this.titleEl, this.imageEl);
  }

  changeTitleText(text: string): void {
    this.titleEl.textContent = text;
  }

  show(): void {
    document.body.classList.add('game-end-splash-screen-show');
    this.el.classList.remove('game-end-splash-screen_hidden');
    this.audioEl.play();
  }

  hide(): void {
    document.body.classList.remove('game-end-splash-screen-show');
    this.el.classList.add('game-end-splash-screen_hidden');
  }
}
